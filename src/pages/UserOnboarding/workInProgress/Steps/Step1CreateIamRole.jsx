import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { updateStep1Field } from "../../../redux/wizard/wizard.actions";
import CopyableCodeBlock from "./components/CopyableCodeBlock";
import CopyableInput from "./components/CopyableInput";
import TextField from "@mui/material/TextField";
import { useAccount } from "../../../../Context/AccountContext";

const TRUST_POLICY_JSON = `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::951485052809:role/ck-tuner-nonprod-transitive-role"
      },
      "Action": "sts:AssumeRole",
      "Condition": {
        "StringEquals": {
          "sts:ExternalId": "MU1IHX0R..."
        }
      }
    }
  ]
}`;


const ckNum="w-7 h-7 rounded-full bg-slate-400 flex items-center justify-center text-white font-bold text-[13px]";
const ckRow="grid grid-cols-[34px_1fr] gap-3.5 py-3 border-b border-gray-100";
const ckRowBody="text-gray-900 text-base leading-[1.45]";


export default function Step1CreateIamRole() {
  const { state, dispatch } = useAccount();
  const { step1 } = state;

  return (
    <div className="mx-[30px]">

      <h1 className="mt-2.5 mb-1.5 text-[28px] font-bold text-gray-900">Create an IAM Role</h1>
      <p className="mb-4.5 text-sm text-gray-500">Create an IAM Role by following these steps</p>

      <div className="bg-white border border-gray-200 rounded-[10px] p-4.5">
        <div className={ckRow}>
          <div className={ckNum}>1</div>
          <div className={ckRowBody}>
            Log into AWS account &amp;{" "}
            <a href="#" onClick={(e) => e.preventDefault()}>
              Create an IAM Role
            </a>
            .
          </div>
        </div>

        <div className={ckRow}>
          <div className={ckNum}>2</div>
          <div className={ckRowBody}>
            In the <i>Trusted entity type</i> section, select{" "}
            <b>Custom trust policy</b>. Replace the prefilled policy with the
            policy provided below -
            <div className="h-2.5" />
            <CopyableCodeBlock value={TRUST_POLICY_JSON} />
          </div>
        </div>

        <div className={ckRow}>
          <div className={ckNum}>3</div>
          <div className={ckRowBody}>
            Click on <b>Next</b> to go to the <i>Add permissions</i> page. We would
            not be adding any permissions for now. Click on <b>Next</b>.
          </div>
        </div>

        <div className={ckRow}>
          <div className={ckNum}>4</div>
          <div className={ckRowBody}>
            In the <i>Role name</i> field, enter the below-mentioned role name,
            and click on <b>Create Role</b> -
            <div className="h-2.5" />
            <CopyableInput value="CK-Tuner-Role-dev2" />
          </div>
        </div>

        <div className={ckRow}>
          <div className={ckNum}>5</div>
          <div className={ckRowBody}>
            Go to the newly create IAM Role and copy the Role ARN -
            <div className="h-2.5" />
            <img
              src="src/assets/iam-configuration.png"
              alt=""
              className="w-full"
            />
          </div>
        </div>

        <div className={ckRow}>
          <div className={ckNum}>6</div>
          <div className={ckRowBody}>
            Fill these 3 fields (temporary for now). All 3 are mandatory before
            proceeding.
            <div className="h-2.5" />

            <div className="grid grid-cols-3 gap-3.5">
              <div className="ckflex flex-col gap-1.5Field">
                <label className="text-[13px] font-semibold text-gray-900">Account ID *</label>
                <TextField
                  fullWidth
                  size="small"
                  value={step1.accountId}
                  onChange={(e) =>
                    dispatch({
                      type: "UPDATE_STEP1_FIELD",
                      payload: { fieldName: "accountId", value: e.target.value },
                    })
                  }
                  placeholder="Enter value"
                  variant="outlined"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-semibold text-gray-900">Account Name *</label>
                <TextField
                  fullWidth
                  size="small"
                  value={step1.accountName}
                  onChange={(e) =>
                    dispatch({
                      type: "UPDATE_STEP1_FIELD",
                      payload: { fieldName: "accountName", value: e.target.value },
                    })
                  }
                  placeholder="Enter value"
                  variant="outlined"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-semibold text-gray-900">ARN *</label>
                <TextField
                  fullWidth
                  size="small"
                  value={step1.arn}
                  onChange={(e) =>
                    dispatch({
                      type: "UPDATE_STEP1_FIELD",
                      payload: { fieldName: "arn", value: e.target.value },
                    })
                  }
                  placeholder="Enter value"
                  variant="outlined"
                />
              </div>
            </div>

            <div className="mt-2.5 text-xs text-slate-500">
              You can proceed only when all 3 fields are filled.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
