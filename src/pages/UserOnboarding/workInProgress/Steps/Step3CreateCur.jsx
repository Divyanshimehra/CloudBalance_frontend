/* eslint-disable no-unused-vars */
import React, { useMemo, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
import CopyableInput from "./components/CopyableInput";
import { useAccount } from "../../../../Context/AccountContext";

const ckNum="w-7 h-7 rounded-full bg-slate-400 flex items-center justify-center text-white font-bold text-[13px]";
const ckRow="grid grid-cols-[34px_1fr] gap-3.5 py-3 border-b border-gray-100";
const ckRowBody="text-gray-900 text-base leading-[1.45]";


export default function Step3CreateCur() {
  const reportName = useMemo(() => "ck-tuner-951485052809-hourly-cur", []);

  return (
    <div className="mx-[30px]">
      <h1 className="mt-2.5 mb-1.5 text-[28px] font-bold text-gray-900">Create Cost &amp; Usage Report</h1>
      <p className="mb-4.5 text-sm text-gray-500">
        Create a Cost &amp; Usage Report by following these steps
      </p>

      <div className="bg-white border border-gray-200 rounded-[10px] p-4.5">
        <div className={ckRow}>
          <div className={ckNum}>1</div>
          <div className={ckRowBody}>
            Go to{" "}
            <a href="#" onClick={(e) => e.preventDefault()}>
              <b>Cost and Usage Reports</b>
            </a>{" "}
            in Billing Dashboard and click on <b>Create report</b>.
          </div>
        </div>

        <div className={ckRow}>
          <div className={ckNum}>2</div>
          <div className={ckRowBody}>
            Name the report as shown below:
            <div className="h-2.5" />
            <CopyableInput value={reportName} />
            <div className="h-2.5" />

            <div className="text-xs">
              Ensure that the following configuration is checked
            </div>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <input type="checkbox" checked readOnly /> Include Resource IDs
            <div className="h-2.5" />
          </div>
          <div>Click on <b>Next</b></div>
          <img
            src="src/assets/specify-report.png"
            alt=""
            className="w-full"
          />
        </div>

        <div className={ckRow}>
          <div className={ckNum}>3</div>
          <div className={ckRowBody}>
            In <i>Configure S3 Bucket</i>, provide the name of the S3 bucket that
            was created
            <div className="h-2.5" />
            <div className="text-xs">
              Ensure that the following configuration is checked
            </div>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <input type="checkbox" checked readOnly />{" "}
            <b>
              The following default policy will be applied to your bucket
            </b>
            <div className="h-2.5" />
            <div>
              Click on <b>Save</b>
            </div>
            <div className="h-2.5" />

            <img
              src="src/assets/configure-s3.png"
              alt=""
              className="w-full"
            />
          </div>
        </div>

        <div className={ckRow}>
          <div className={ckNum}>4</div>
          <div className={ckRowBody}>
            In the Delivery options section, enter the below-mentioned Report
            path prefix -
            <div className="h-2.5" />
            <label className="text-[13px] font-semibold text-gray-900">Report path prefix:</label>
            <CopyableInput value="951485052809" />{" "}
            <div className="text-xs">
              Additionally ensure that the following checks are in place
              <div>
                Time Granularity
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;
                <input type="radio" checked readOnly /> <b>Hourly</b>
              </div>
              <div className="h-2.5" />
              Please make sure these checks are Enabled in Enable report data
              integration for:
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;
              <input type="checkbox" checked readOnly /> Amazon Athena
              <div className="h-2.5" />

              <img
                src="src/assets/report-delivery.png"
                alt=""
                className="w-full"
              />
            </div>
          </div>
        </div>

        <div className={ckRow}>
          <div className={ckNum}>5</div>
          <div className={ckRowBody}>
            Click on <b>Next</b>. Now, review the configuration of the Cost and
            Usage Report. Once satisfied, click on{" "}
            <b>Create Report</b>.
          </div>
        </div>
      </div>
    </div>
  );
}
