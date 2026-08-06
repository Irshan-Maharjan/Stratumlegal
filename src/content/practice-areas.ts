import type { PracticeArea } from './types';

/**
 * Practice areas, in priority order. Corporate and commercial first, criminal
 * litigation last — the audience is a general counsel or a foreign investor, and
 * the ordering states what the firm principally does.
 *
 * Copy rule: describe what the area covers and which statutes and regulators
 * govern it. Never describe how well the firm performs, and never reference a
 * matter the firm has acted in.
 */

export const PRACTICE_AREAS: PracticeArea[] = [
  {
    slug: 'foreign-direct-investment',
    title: 'Foreign direct investment & market entry',
    summary:
      'Approvals, structuring and registration for foreign investors establishing operations in Nepal.',
    order: 1,
    overview: [
      'Foreign investment into Nepal runs through a defined approval pathway. The Foreign Investment and Technology Transfer Act 2019 sets the minimum investment threshold, the permitted and restricted sectors, and the approving authority for each class of investment. Depending on the size and sector of the investment, approval is granted by the Department of Industry or by the Investment Board Nepal.',
      'We advise on which pathway applies to a proposed investment, prepare the approval application and supporting documents, and carry the file through to company registration, industry registration, tax registration and the opening of the investment account.',
      'Approval is the beginning rather than the end. Repatriation of dividends, capital and royalties requires separate recording of the investment with Nepal Rastra Bank, and we advise on that step at the point of entry rather than when the first dividend is declared.',
    ],
    services: [
      'Sector eligibility and threshold analysis under FITTA 2019',
      'Foreign investment approval applications to the Department of Industry',
      'Applications to the Investment Board Nepal for large-scale projects',
      'Company incorporation at the Office of the Company Registrar',
      'Industry registration and operating licences',
      'Nepal Rastra Bank investment recording and repatriation approvals',
      'Technology transfer, licensing and royalty agreements',
      'Joint venture and shareholders agreements',
      'Branch and liaison office establishment',
    ],
    statutes: [
      { name: 'Foreign Investment and Technology Transfer Act 2019 (FITTA)', note: 'Approval pathway, thresholds, restricted sectors' },
      { name: 'Foreign Investment and Technology Transfer Rules 2021' },
      { name: 'Companies Act 2063 (2006)' },
      { name: 'Industrial Enterprises Act 2076 (2020)' },
      { name: 'Foreign Exchange (Regulation) Act 2019 (1962)' },
      { name: 'Public Private Partnership and Investment Act 2075 (2019)' },
    ],
    regulators: [
      { name: 'Department of Industry', note: 'Approving authority for most foreign investment' },
      { name: 'Investment Board Nepal', note: 'Large-scale and specified projects' },
      { name: 'Office of the Company Registrar' },
      { name: 'Nepal Rastra Bank', note: 'Investment recording and repatriation' },
      { name: 'Inland Revenue Department' },
    ],
    people: [],
  },
  {
    slug: 'corporate-commercial',
    title: 'Corporate & commercial',
    summary:
      'Company formation, governance, shareholder arrangements and the commercial contracts a business runs on.',
    order: 2,
    overview: [
      'We act for companies through their whole life: incorporation, the agreements between their shareholders, the contracts they trade under, and the corporate filings that keep them in good standing at the Office of the Company Registrar.',
      'Much of this work is preventative. Shareholder deadlock, unclear signing authority and unenforceable termination clauses are cheaper to address when the document is drafted than when the relationship has broken down.',
    ],
    services: [
      'Company incorporation, conversion and restructuring',
      'Memorandum and articles of association',
      'Shareholders agreements and joint venture documentation',
      'Board and general meeting procedure, corporate secretarial support',
      'Annual compliance and Company Registrar filings',
      'Commercial contracts: supply, distribution, agency, services',
      'Corporate governance advice for boards and subsidiaries',
      'Company liquidation and deregistration',
    ],
    statutes: [
      { name: 'Companies Act 2063 (2006)' },
      { name: 'Contract Act 2056 (2000)' },
      { name: 'Industrial Enterprises Act 2076 (2020)' },
      { name: 'Insolvency Act 2063 (2006)' },
      { name: 'Securities Act 2063 (2007)', note: 'For listed and public companies' },
    ],
    regulators: [
      { name: 'Office of the Company Registrar' },
      { name: 'Securities Board of Nepal', note: 'Public and listed companies' },
      { name: 'Department of Industry' },
    ],
    people: [],
  },
  {
    slug: 'banking-finance',
    title: 'Banking & finance',
    summary:
      'Lending, security, regulatory compliance and recovery for banks, financial institutions and borrowers.',
    order: 3,
    overview: [
      'We advise banks and financial institutions licensed under the Bank and Financial Institutions Act 2073, and the companies that borrow from them. The work covers facility documentation, the creation and registration of security, and the regulatory requirements Nepal Rastra Bank imposes on licensed institutions.',
      'Security in Nepal is formality-sensitive. Mortgages, hypothecation of movable property and corporate guarantees each have their own registration requirements, and a security interest that is imperfectly registered may not survive the borrower becoming insolvent.',
    ],
    services: [
      'Facility agreements and term sheets',
      'Security documentation: mortgage, hypothecation, pledge, guarantee',
      'Security registration and perfection',
      'Project and infrastructure finance documentation',
      'Nepal Rastra Bank directives and licensing compliance',
      'Loan restructuring and rescheduling',
      'Debt recovery before the Debt Recovery Tribunal',
      'Anti-money laundering and KYC compliance frameworks',
    ],
    statutes: [
      { name: 'Nepal Rastra Bank Act 2058 (2002)' },
      { name: 'Bank and Financial Institutions Act 2073 (2017)' },
      { name: 'Banking Offence and Punishment Act 2064 (2008)' },
      { name: 'Secured Transactions Act 2063 (2006)' },
      { name: 'Asset (Money) Laundering Prevention Act 2064 (2008)' },
      { name: 'Debt Recovery of Bank and Financial Institution Act 2058 (2002)' },
    ],
    regulators: [
      { name: 'Nepal Rastra Bank', note: 'Licensing and prudential regulation' },
      { name: 'Debt Recovery Tribunal' },
      { name: 'Financial Information Unit', note: 'Anti-money laundering reporting' },
      { name: 'Secured Transactions Registry Office' },
    ],
    people: [],
  },
  {
    slug: 'energy-infrastructure',
    title: 'Energy & infrastructure',
    summary:
      'Hydropower, transmission and infrastructure projects, from licensing through to power purchase and construction.',
    order: 4,
    overview: [
      'Nepal’s energy sector runs on a licensing regime administered by the Department of Electricity Development, with generation licences granted for defined terms and survey licences preceding them. Most generation projects sell into a power purchase agreement with the Nepal Electricity Authority.',
      'We advise developers, lenders and contractors across the project lifecycle: securing survey and generation licences, land acquisition and access, environmental clearance, construction and EPC contracting, and the connection and offtake arrangements that make a project financeable.',
    ],
    services: [
      'Survey and generation licence applications',
      'Power purchase agreements and connection agreements',
      'EPC and construction contracts',
      'Land acquisition, lease and right-of-way',
      'Environmental impact assessment and clearance process',
      'Project finance and security packages',
      'Concession and public-private partnership agreements',
      'Regulatory advice on tariff and licensing conditions',
    ],
    statutes: [
      { name: 'Electricity Act 2049 (1992)' },
      { name: 'Electricity Regulatory Commission Act 2074 (2017)' },
      { name: 'Environment Protection Act 2076 (2019)' },
      { name: 'Land Acquisition Act 2034 (1977)' },
      { name: 'Public Private Partnership and Investment Act 2075 (2019)' },
      { name: 'Water Resources Act 2049 (1992)' },
    ],
    regulators: [
      { name: 'Department of Electricity Development', note: 'Survey and generation licensing' },
      { name: 'Electricity Regulatory Commission', note: 'Tariff and market regulation' },
      { name: 'Nepal Electricity Authority', note: 'Offtake and grid connection' },
      { name: 'Ministry of Forests and Environment' },
      { name: 'Investment Board Nepal', note: 'Large-scale projects' },
    ],
    people: [],
  },
  {
    slug: 'mergers-acquisitions',
    title: 'Mergers & acquisitions',
    summary:
      'Share and asset transactions, due diligence, and the regulatory approvals a change of control requires.',
    order: 5,
    overview: [
      'We act on the acquisition and disposal of Nepali companies and businesses, whether structured as a share transfer, an asset transfer or a merger under the Companies Act 2063.',
      'Diligence in Nepal has particular pressure points: land title and its transferability, whether foreign investment approvals were properly obtained and recorded, employee entitlements accrued under the Labour Act 2074, and tax positions that survive a change of ownership. Where the buyer is foreign, the transaction also needs approval under FITTA 2019, and the timing of that approval usually determines the transaction timetable.',
    ],
    services: [
      'Legal due diligence and red-flag reporting',
      'Share purchase and asset purchase agreements',
      'Merger and amalgamation under the Companies Act',
      'Foreign investment approval for change of control',
      'Competition and regulatory clearances',
      'Transitional services and post-completion integration',
      'Escrow, warranty and indemnity arrangements',
    ],
    statutes: [
      { name: 'Companies Act 2063 (2006)' },
      { name: 'Foreign Investment and Technology Transfer Act 2019 (FITTA)' },
      { name: 'Income Tax Act 2058 (2002)', note: 'Capital gains on disposal' },
      { name: 'Competition Promotion and Market Protection Act 2063 (2007)' },
      { name: 'Securities Act 2063 (2007)', note: 'Listed company acquisitions' },
    ],
    regulators: [
      { name: 'Office of the Company Registrar' },
      { name: 'Department of Industry' },
      { name: 'Inland Revenue Department' },
      { name: 'Securities Board of Nepal' },
    ],
    people: [],
  },
  {
    slug: 'employment-labour',
    title: 'Employment & labour',
    summary:
      'Contracts, workplace policy, termination process and disputes under the Labour Act 2074.',
    order: 6,
    overview: [
      'The Labour Act 2074 and the Labour Rules 2075 govern employment in Nepal, including the categories of employment, working hours, leave, social security contributions, and the process an employer must follow before terminating an employee.',
      'Termination is the area where employers most often create liability, because the Act prescribes procedural steps — notice, opportunity to respond, and documented grounds — and a dismissal that is substantively fair can still fail for want of process.',
      'We advise on employment documentation, workplace policies, restructuring and redundancy, and representation before the Labour Court.',
    ],
    services: [
      'Employment contracts and appointment letters',
      'Employee handbooks and workplace policies',
      'Social Security Fund registration and contributions',
      'Work permits and visas for foreign nationals',
      'Disciplinary and termination process',
      'Redundancy and restructuring',
      'Collective bargaining and trade union matters',
      'Labour Court representation',
      'Sexual harassment policy and investigation procedure',
    ],
    statutes: [
      { name: 'Labour Act 2074 (2017)' },
      { name: 'Labour Rules 2075 (2018)' },
      { name: 'Contribution Based Social Security Act 2074 (2017)' },
      { name: 'Trade Union Act 2049 (1992)' },
      { name: 'Sexual Harassment at Workplace (Prevention) Act 2071 (2015)' },
      { name: 'Bonus Act 2030 (1974)' },
    ],
    regulators: [
      { name: 'Department of Labour and Occupational Safety' },
      { name: 'Social Security Fund' },
      { name: 'Labour Court' },
      { name: 'Department of Immigration', note: 'Work permits and visas' },
    ],
    people: [],
  },
  {
    slug: 'tax',
    title: 'Tax',
    summary:
      'Corporate tax, VAT, withholding, transfer pricing and disputes with the Inland Revenue Department.',
    order: 7,
    overview: [
      'We advise on the tax treatment of transactions and structures under the Income Tax Act 2058 and the Value Added Tax Act 2052, and on the withholding obligations that attach to cross-border payments.',
      'For foreign investors, the questions that recur are whether a permanent establishment arises, what rate of withholding applies to dividends, interest, royalties and service fees, and whether a double taxation avoidance agreement reduces that rate. Nepal has treaties with a limited number of countries, and whether one applies is often decisive to the economics of a structure.',
    ],
    services: [
      'Transaction structuring and tax opinions',
      'Permanent establishment analysis',
      'Withholding tax on cross-border payments',
      'Double taxation avoidance agreement application',
      'VAT registration, treatment and refunds',
      'Transfer pricing documentation',
      'Tax assessment objections and appeals',
      'Representation before the Revenue Tribunal',
      'Customs and excise advice',
    ],
    statutes: [
      { name: 'Income Tax Act 2058 (2002)' },
      { name: 'Value Added Tax Act 2052 (1996)' },
      { name: 'Excise Act 2058 (2002)' },
      { name: 'Customs Act 2064 (2007)' },
      { name: 'Finance Act', note: 'Annual — rates and thresholds change each fiscal year' },
    ],
    regulators: [
      { name: 'Inland Revenue Department' },
      { name: 'Large Taxpayers Office' },
      { name: 'Revenue Tribunal' },
      { name: 'Department of Customs' },
    ],
    people: [],
  },
  {
    slug: 'intellectual-property',
    title: 'Intellectual property',
    summary:
      'Trademark and patent registration, licensing, and enforcement against infringement.',
    order: 8,
    overview: [
      'Trademarks, patents and designs are registered with the Department of Industry under the Patent, Design and Trademark Act 2022, which remains the governing statute. Nepal operates a first-to-file trademark system, so an unregistered mark used in the market can be vulnerable to a third-party application.',
      'We advise on clearance and registration, the licensing and assignment of rights, and enforcement where a mark or design is being infringed.',
    ],
    services: [
      'Trademark clearance searches and registration',
      'Trademark renewal and portfolio management',
      'Patent and industrial design registration',
      'Copyright registration and advice',
      'Licensing, assignment and franchise agreements',
      'Opposition and cancellation proceedings',
      'Infringement actions and customs recordal',
      'Domain name and trade name disputes',
    ],
    statutes: [
      { name: 'Patent, Design and Trademark Act 2022 (1965)' },
      { name: 'Copyright Act 2059 (2002)' },
      { name: 'Copyright Rules 2061 (2004)' },
      { name: 'Competition Promotion and Market Protection Act 2063 (2007)' },
    ],
    regulators: [
      { name: 'Department of Industry', note: 'Trademark, patent and design registry' },
      { name: 'Nepal Copyright Registrar’s Office' },
      { name: 'Department of Customs', note: 'Border enforcement' },
    ],
    people: [],
  },
  {
    slug: 'dispute-resolution-arbitration',
    title: 'Dispute resolution & arbitration',
    summary:
      'Commercial litigation before the Nepali courts, domestic and international arbitration, and enforcement of awards.',
    order: 9,
    overview: [
      'Commercial disputes in Nepal are heard by the District Courts and High Courts, with appeal to the Supreme Court. Arbitration is governed by the Arbitration Act 2055, and Nepal is a party to the New York Convention, so foreign arbitral awards are enforceable subject to the grounds set out in that Act.',
      'We advise on the dispute resolution clause before a dispute exists — seat, governing law, institution and language are choices that determine how a dispute will be run years later — and act in proceedings once one has arisen.',
    ],
    services: [
      'Commercial litigation before District and High Courts',
      'Supreme Court appeals and writ petitions',
      'Domestic and international commercial arbitration',
      'Drafting and reviewing dispute resolution clauses',
      'Enforcement of foreign arbitral awards',
      'Mediation and negotiated settlement',
      'Interim relief and injunctions',
      'Construction and contract disputes',
    ],
    statutes: [
      { name: 'Arbitration Act 2055 (1999)' },
      { name: 'Civil Procedure Code 2074 (2017)' },
      { name: 'National Civil Code 2074 (2017)' },
      { name: 'Convention on the Recognition and Enforcement of Foreign Arbitral Awards', note: 'New York Convention' },
    ],
    regulators: [
      { name: 'Supreme Court of Nepal' },
      { name: 'High Courts' },
      { name: 'Nepal Council of Arbitration (NEPCA)' },
    ],
    people: [],
  },
  {
    slug: 'criminal-white-collar',
    title: 'Criminal & white-collar litigation',
    summary:
      'Defence in economic offence, banking offence and corruption proceedings, and related investigations.',
    order: 10,
    isLitigation: true,
    overview: [
      'We act in criminal proceedings arising from commercial activity: banking offences, revenue and customs matters, money laundering, and corruption proceedings before the Special Court.',
      'This work often begins before any charge is filed, at the investigation stage, when a company or an individual receives a request for documents or a summons from an investigating agency. What is said and produced at that stage shapes everything that follows.',
      'We also act in general criminal defence under the National Penal Code 2074.',
    ],
    services: [
      'Representation during investigation and questioning',
      'Bail applications and pre-trial matters',
      'Defence in banking offence proceedings',
      'Money laundering and asset freezing proceedings',
      'Corruption proceedings before the Special Court',
      'Revenue, customs and excise prosecutions',
      'Internal investigations and corporate compliance reviews',
      'Appeals against conviction and sentence',
    ],
    statutes: [
      { name: 'National Penal Code 2074 (2017)' },
      { name: 'National Criminal Procedure Code 2074 (2017)' },
      { name: 'Banking Offence and Punishment Act 2064 (2008)' },
      { name: 'Asset (Money) Laundering Prevention Act 2064 (2008)' },
      { name: 'Prevention of Corruption Act 2059 (2002)' },
      { name: 'Some Public (Crime and Punishment) Act 2027 (1970)' },
    ],
    regulators: [
      { name: 'Office of the Attorney General' },
      { name: 'Commission for the Investigation of Abuse of Authority (CIAA)' },
      { name: 'Department of Money Laundering Investigation' },
      { name: 'Special Court' },
      { name: 'Nepal Police, Central Investigation Bureau' },
    ],
    people: [],
  },
];

export const getPracticeArea = (slug: string): PracticeArea | undefined =>
  PRACTICE_AREAS.find((area) => area.slug === slug);

/** Sorted by the declared priority order rather than by array position. */
export const orderedPracticeAreas = (): PracticeArea[] =>
  [...PRACTICE_AREAS].sort((a, b) => a.order - b.order);
