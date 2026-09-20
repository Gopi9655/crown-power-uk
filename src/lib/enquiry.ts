export const applicationKinds = [
  "Internship / work experience",
  "Training programme",
  "Graduate / early career",
  "General application",
];
export const applicationAreas = [
  "Engineering",
  "Energy",
  "Business",
  "Finance",
  "Health & Safety",
  "Technology",
];
export const contactInterests = [
  "General enquiry",
  "Renewable Integration",
  "Smart Energy Technologies",
  "Power Systems",
  "Industrial & Commercial",
  "Specialised Services",
  "Battery Energy Storage (BESS)",
  "Smart Grid Transformers",
  "Battery Products",
  "Internships & Careers",
  "Partnership",
  "Other",
];
export type Enquiry = {
  type: "contact" | "application";
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  interest: string;
  kind: string;
  area: string;
  message: string;
  consent: boolean;
  website: string;
};
export type FormErrors = Partial<Record<keyof Enquiry, string>>;
export function emptyEnquiry(type: Enquiry["type"]): Enquiry {
  return {
    type,
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    interest: "General enquiry",
    kind: "",
    area: "",
    message: "",
    consent: false,
    website: "",
  };
}
export function validateEnquiry(values: Enquiry): FormErrors {
  const errors: FormErrors = {};
  if (!values.firstName.trim())
    errors.firstName = "Please enter your first name.";
  if (!values.lastName.trim()) errors.lastName = "Please enter your last name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()))
    errors.email = "Please enter a valid email address.";
  if (values.message.trim().length < 10)
    errors.message = "Please include at least 10 characters.";
  if (!values.consent) errors.consent = "Please provide consent to continue.";
  if (values.type === "application" && !applicationKinds.includes(values.kind))
    errors.kind = "Please choose what you are applying for.";
  if (
    values.type === "application" &&
    values.area &&
    !applicationAreas.includes(values.area)
  )
    errors.area = "Please choose an area from the list.";
  if (values.type === "contact" && !contactInterests.includes(values.interest))
    errors.interest = "Please choose an area of interest from the list.";
  for (const key of [
    "firstName",
    "lastName",
    "email",
    "phone",
    "company",
    "message",
  ] as const) {
    const max = key === "message" ? 5000 : key === "phone" ? 50 : 200;
    if (values[key].length > max)
      errors[key] = `Please use ${max} characters or fewer.`;
  }
  return errors;
}
