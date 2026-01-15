import ReusableTable from "../../components/ReusableTable";
import { useState } from "react";

export default function AWS() {

    const [selectedService, setSelectedService] = useState("EC2");

    const ec2Columns = [
        { field: 'resourceID', headerName: 'Resource ID', filterable: true, copyable: true },
        { field: 'resourceName', headerName: 'Resource Name', filterable: true},
        { field: 'region', headerName: 'Region', filterable: true},
        { field: 'status', headerName: 'Status', filterable: true},
    ];

    const ec2Rows = [
        { id: 1, resourceID: 'i-0abcd1234efgh5678', resourceName: 'WebServer1', region: 'us-east-1', status: 'Running' },
        { id: 2, resourceID: 'i-1abcd1234efgh5678', resourceName: 'Database1', region: 'us-west-2', status: 'Stopped' },
        { id: 3, resourceID: 'i-2abcd1234efgh5678', resourceName: 'CacheServer1', region: 'eu-central-1', status: 'Running' },
    ];

    const rdsColumns = [
        { field: 'resourceID', headerName: 'Resource ID', copyable: true , filterable: true},
        { field: 'resourceName', headerName: 'Resource Name', filterable: true},
        { field: 'engine', headerName: 'Engine', filterable: true},
        { field: 'region', headerName: 'Region'},
        { field: 'status', headerName: 'Status'},
    ];

    const rdsRows = [
        { resourceID: 'arn:aws:rds:0abcd1234efgh5678', resourceName: 'ck-uat-ue1-kong-rds', engine: 'postgres', region: 'us-east-1', status: 'Running' },
        { resourceID: 'arn:aws:rds:1abcd1234efgh5678', resourceName: 'cloudonomic-dev', engine: 'mysql', region: 'us-west-2', status: 'Stopped' },
        { resourceID: 'arn:aws:rds:2abcd1234efgh5678', resourceName: 'cloud-pricing-rds', engine: 'postgres', region: 'eu-central-1', status: 'Running' },
    ];

    const asgColumns = [
        { field: 'resourceID', headerName: 'Resource ID' , copyable: true , filterable: true},
        { field: 'resourceName', headerName: 'Resource Name', filterable: true},
        { field: 'region', headerName: 'Region'},
        { field: 'desiredCapacity', headerName: 'Desired Capacity', filterable: true},
        { field: 'minSize', headerName: 'Min Size', filterable: true},
        { field: 'maxSize', headerName: 'Max Size', filterable: true},
        { field: 'status', headerName: 'Status', filterable: true},
    ];

    const asgRows = [
        { resourceID: 'arn:aws:autoscaling:0abcd1234efgh5678', resourceName: 'WebServer1', region: 'us-east-1', desiredCapacity: '4', minSize: '2', maxSize: '5' , status: 'Running' },
        { resourceID: 'arn:aws:autoscaling:1abcd1234efgh5678', resourceName: 'Database1', region: 'us-west-2', desiredCapacity: '2', minSize: '0', maxSize: '4' , status: 'Stopped' },
        { resourceID: 'arn:aws:autoscaling:2abcd1234efgh5678', resourceName: 'CacheServer1', region: 'eu-central-1', desiredCapacity: '3', minSize: '1', maxSize: '5' , status: 'Running' },
    ];

    //Dynamic table config based on selected service
    const tableConfig = {
        EC2: { columns: ec2Columns, rows: ec2Rows },
        RDS: { columns: rdsColumns, rows: rdsRows },
        ASG: { columns: asgColumns, rows: asgRows },
    };

    return (
    <>
      <h1 className="font-bold text-2xl m-5">AWS Services</h1>
      <div className="bg-white m-5 p-5">

        {/* Service Selection */}
        <div className="flex gap-4 mb-6 border-b border-gray-300">
            {["EC2", "RDS", "ASG"].map(service => (
            <button
              key={service}
              onClick={() => setSelectedService(service)}
              className={`pb-2 px-4 font-medium ${
                selectedService === service
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-500"
                }`}
              >
                {service}
              </button>
            ))}
        </div>

        {/* AWS Table */}
        <ReusableTable
            columns={tableConfig[selectedService].columns}
            rows={tableConfig[selectedService].rows}
        />
      </div>
    </>
    );
}