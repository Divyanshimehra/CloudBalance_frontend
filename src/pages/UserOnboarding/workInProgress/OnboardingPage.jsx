import React, { useMemo } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { setCurrentIndex, resetWizard } from "../../redux/wizard/wizard.actions";
import { useAccount } from "../../../Context/AccountContext";
import Step1CreateIamRole from "./Steps/Step1CreateIamRole";
import Step2AddCustomerManagedPolicies from "./Steps/Step2AddCustomerManagedPolicies";
import Step3CreateCur from "./Steps/Step3CreateCur";
import OnboardingStepper from "./OnboardingStepper";
import OnboardingFooter from "./OnboardingFooter";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../../../api/apiClient";

export default function OnboardingPage() {
   const { state, dispatch } = useAccount();
  const { currentIndex, step1 } = state;

  const navigate = useNavigate();

  // ✅ ONLY 3 pages exist
  const steps = useMemo(
    () => [
      { letter: "A", label: "Create an IAM Role" },
      { letter: "B", label: "Add Customer Managed Policies" },
      { letter: "C", label: "Create CUR" },
    ],
    []
  );

  const pageNames = useMemo(
    () => steps.map((s) => s.label),
    [steps]
  );

  // Step 1 completion requires all 3 textfields
  const isStep1Complete =
    step1.accountId.trim() !== "" &&
    step1.accountName.trim() !== "" &&
    step1.arn.trim() !== "";

  const canGoNext = () => {
    if (currentIndex === 0) return isStep1Complete;
    if (currentIndex === 1) return true;
    if (currentIndex === 2) return true;
    return false;
  };

  const goNext = async () => {
    if (!canGoNext()) return;

    if (currentIndex < steps.length - 1) {
      dispatch({ type: "SET_CURRENT_INDEX", payload: currentIndex + 1 });
    } else {
      // ✅ Final submit
      const payload = {
      arn: step1.arn,
      accountId: Number(step1.accountId),
      accountName: step1.accountName,
    };

    try {
      await apiFetch("/onboard", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      alert("Account onboarded successfully");

      dispatch({ type: "RESET" });
      navigate("/dashboard/onboarding");
    } catch (error) {
      console.error("Onboarding failed:", error);
      alert("Failed to onboard account");
    }
   }
  };

  const goBack = () => {
    if (currentIndex === 0) return;
    dispatch({ type: "SET_CURRENT_INDEX", payload: currentIndex - 1 });
  };

  const handleCancel = () => {
    dispatch({ type: "RESET" });
  };

  const renderContent = () => {
    if (currentIndex === 0) return <Step1CreateIamRole />;
    if (currentIndex === 1) return <Step2AddCustomerManagedPolicies />;
    return <Step3CreateCur />;
  };

  return (
    <div className="bg-[#f4f6f8] h-screen grid grid-rows-[auto_1fr_auto] overflow-hidden font-sans text-base">

      <OnboardingStepper steps={steps} currentIndex={currentIndex} />

      <div className="px-7 py-4 overflow-y-auto min-h-0">{renderContent()}</div>

      <OnboardingFooter
        currentIndex={currentIndex}
        pageNames={pageNames}
        onCancel={handleCancel}
        onBack={goBack}
        onNext={goNext}
        isNextEnabled={canGoNext()}
      />
    </div>
  );
}