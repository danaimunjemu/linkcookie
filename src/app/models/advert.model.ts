
export interface Advert {
    userId: string,
    type: string,
    payment: string,
    dateCreated: string,
    dateDue: string,
    adSkills: string[],
    adTitle: string,
    adSummary: string,
    jobType: string,
    jobLength: string,
    jobSalary: string,
    jobLocation: string,
    jobDescription: string[],
    projectBudget: string,
    projectLength: string,
    consultantPricing: string,
    applicants: string[]
}
