import React from "react";
import CopyableCodeBlock from "./components/CopyableCodeBlock";
import CopyableInput from "./components/CopyableInput";


const COST_AUDIT = "A lot of data cost_audit policy json here";
const SEC_AUDIT = "A lot of data sec_audit policy json here";
const TUNER_READ = "A lot of data tuner_read policy json here";

const ckNum="w-7 h-7 rounded-full bg-slate-400 flex items-center justify-center text-white font-bold text-[13px]";
const ckRow="grid grid-cols-[34px_1fr] gap-3.5 py-3 border-b border-gray-100";
const ckRowBody="text-gray-900 text-base leading-[1.45]";

export default function Step2AddCustomerManagedPolicies() {
  return (
    <div className="mx-[30px]">
      <h1 className="mt-2.5 mb-1.5 text-[28px] font-bold text-gray-900">Add Customer Managed Policies</h1>
      <p className="mb-4.5 text-sm text-gray-500">
        Create an Inline policy for the role by following these steps
      </p>

      <div className="bg-white border border-gray-200 rounded-[10px] p-4.5">
        <div className={ckRow}>
          <div className={ckNum}>1</div>
          <div className={ckRowBody}>
            Go to the{" "}
            <a href="#" onClick={(e) => e.preventDefault()}>
              Create Policy
            </a>{" "}
            Page.
          </div>
        </div>

        <div className={ckRow}>
          <div className={ckNum}>2</div>
          <div className={ckRowBody}>
            Click on the <b>JSON</b> tab and paste the following policy and click
            on <b>Next</b>:
            <div className="h-2.5" />
            <CopyableCodeBlock value={COST_AUDIT} />
          </div>
        </div>

        <div className={ckRow}>
          <div className={ckNum}>3</div>
          <div className={ckRowBody}>
            In the <b>Name</b> field, enter below-mentioned policy name and click
            on Create Policy
            <div className="h-2.5" />
            <CopyableInput value="cktuner-CostAuditPolicy" />
          </div>
        </div>

        <div className={ckRow}>
          <div className={ckNum}>4</div>
          <div className={ckRowBody}>
            Again, go to the{" "}
            <a href="#" onClick={(e) => e.preventDefault()}>
              Create Policy
            </a>{" "}
            Page.
          </div>
        </div>

        <div className={ckRow}>
          <div className={ckNum}>5</div>
          <div className={ckRowBody}>
            Click on the JSON tab and paste the following policy and click on
            Next:
            <div className="h-2.5" />
            <CopyableCodeBlock value={SEC_AUDIT} />
          </div>
        </div>

        <div className={ckRow}>
          <div className={ckNum}>6</div>
          <div className={ckRowBody}>
            In the Name field, enter below-mentioned policy name and click on
            Create Policy
            <div className="h-2.5" />
            <CopyableInput value="cktuner-SecAuditPolicy" />
          </div>
        </div>

        <div className={ckRow}>
          <div className={ckNum}>7</div>
          <div className={ckRowBody}>
            Again, go to the Create Policy Page.
          </div>
        </div>

        <div className={ckRow}>
          <div className={ckNum}>8</div>
          <div className={ckRowBody}>
            Click on the JSON tab and paste the following policy and click on
            Next:
            <div className="h-2.5" />
            <CopyableCodeBlock value={TUNER_READ} />
          </div>
        </div>

        <div className={ckRow}>
          <div className={ckNum}>9</div>
          <div className={ckRowBody}>
            In the Name field, enter below-mentioned policy name and click on
            Create Policy
            <div className="h-2.5" />
            <CopyableInput value="cktuner-TunerReadEssentials" />
          </div>
        </div>

        <div className={ckRow}>
          <div className={ckNum}>10</div>
          <div className={ckRowBody}>
            Go to the{" "}
            <a href="#" onClick={(e) => e.preventDefault()}>
              CK-Tuner-Role
            </a>
            <div className="h-2.5" />
            <img
              src="src/assets/iam-configuration.png"
              alt=""
              className="w-full"
            />
          </div>
        </div>

        <div className={ckRow}>
          <div className={ckNum}>11</div>
          <div className={ckRowBody}>
            In Permission policies, click on{" "}
            <b>Add permissions {" > "} Attach Policy</b>
            <div className="h-2.5" />
            <img
              src="src/assets/permissions-policy.png"
              alt=""
              className="w-full"
            />
          </div>
        </div>

        <div className={ckRow}>
          <div className={ckNum}>12</div>
          <div className={ckRowBody}>
            Filter by Type {" > "} Customer managed then search for{" "}
            <b>
              -CostAuditPolicy, cktuner-SecAuditPolicy,
              cktuner-TunerReadEssentials
            </b>{" "}
            and select them.
            <div className="h-2.5" />
            <img
              src="src/assets/other-permissions-policy.png"
              alt=""
              className="w-full"
            />
          </div>
        </div>

        <div className={ckRow}>
          <div className={ckNum}>13</div>
          <div className={ckRowBody}>
            Now, click on <b>Add permissions</b>
            <div className="h-2.5" />
          </div>
        </div>
      </div>
    </div>
  );
}



