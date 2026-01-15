export const GROUP_BY = [
  { label: "Service", value: "SERVICE", dataKey: "service" },
  { label: "Instance Type", value: "INSTANCE_TYPE", dataKey: "instanceType" },
  { label: "Account ID", value: "ACCOUNT_ID", dataKey: "accountId" },
  { label: "Usage Type", value: "USAGE_TYPE", dataKey: "usageType" },
  { label: "Platform", value: "PLATFORM", dataKey: "platform" },
  { label: "Region", value: "REGION", dataKey: "region" },
  { label: "Usage Type Group", value: "USAGE_TYPE_GROUP", dataKey: "usageTypeGroup" },
];

export const MORE_GROUP_BY = [
  { label: "Purchase Option", value: "PURCHASE_OPTION", dataKey: "purchaseOption" },
  { label: "API Operation", value: "API_OPERATION", dataKey: "apiOperation" },
  { label: "Resource", value: "RESOURCE", dataKey: "resource" },
  { label: "Availability Zone", value: "AVAILABILITY_ZONE", dataKey: "availabilityZone" },
  { label: "Tenancy", value: "TENANCY", dataKey: "tenancy" },
  { label: "Legal Entity", value: "LEGAL_ENTITY", dataKey: "legalEntity" },
  { label: "Billing Entity", value: "BILLING_ENTITY", dataKey: "billingEntity" },
];

// export const FILTER_DEFINITIONS = {
//   SERVICE: {
//     label: "Service",
//     multi: true,
//   },
//   INSTANCE_TYPE: {
//     label: "Instance Type",
//     multi: true,
//   },
//   ACCOUNT_ID: {
//     label: "Account ID",
//     multi: true,
//   },
//   PLATFORM: {
//     label: "Platform",
//     multi: true,
//   },
//   REGION: {
//     label: "Region",
//     multi: true,
//   },
// };

export const DEFAULT_CHART_TYPE = "msline";

export const DEFAULT_DATE_RANGE = {
  start: "2024-12",
  end: "2025-05",
};