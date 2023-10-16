const usStatesLanguagesData = [
    { languages: ["eng", "spa", "zh-CN", "tgl", "vie", "ara", "fra", "kor", "rus", "por", "hat", "hin", "deu", "deu", "ita", "urd", "fas", "tel", "jpn"], state: "United States" },
    { languages: ["eng", "spa", "kor", "zh-CN", "vie", "ara", "deu", "fra", "guj", "tgl", "hin", "lao", "rus", "por", "tur", "jpn"], state: "Alabama" },
    { languages: ["eng", "tgl", "spa", "kor", "hmn", "rus", "smo", "zh-CN", "lao", "jpn", "ilo", "vie", "ukr", "tha", "deu", "pol"], state: "Alaska" },
    { languages: ["eng", "spa", "nav", "zh-CN", "vie", "ara", "tgl", "kor", "fra", "deu", "rus", "jpn", "fas", "syr", "srp", "tha"], state: "Arizona" },
    { languages: ["eng", "spa", "vie", "mah", "zh-CN", "lao", "tgl", "ara", "deu", "fra", "hmn", "kor", "por", "jpn", "hin", "guj"], state: "Arkansas" },
    { languages: ["eng", "spa", "zh-CN", "vie", "tgl", "kor", "hye", "fas", "rus", "jpn", "ara", "pan", "khm", "hmn", "hin", "tha"], state: "California" },
    { languages: ["eng", "spa", "vie", "zh-CN", "kor", "rus", "amh", "ara", "deu", "fra", "nep", "tgl", "jpn", "orm", "fas", "bsq", "ibo", "yor"], state: "Colorado" },
    { languages: ["eng", "spa", "por", "pol", "zh-CN", "ita", "fra", "hat", "rus", "vie", "ara", "kor", "sqi", "hin", "tgl", "ell"], state: "Connecticut" },
    { languages: ["eng", "spa", "zh-CN", "hat", "guj", "fra", "kor", "ita", "vie", "deu", "tgl", "hin", "urd", "ara", "tel", "nld"], state: "Delaware" },
    { languages: ["eng", "spa", "amh", "zh-CN", "fra", "tgl", "rus", "por", "ita", "vie", "bsq", "ibo", "yor", "ben", "jpn", "kor", "tha", "deu", "ara"], state: "District of Columbia" },
    { languages: ["eng", "spa", "hat", "vie", "por", "zh-CN", "fra", "tgl", "rus", "ara", "ita", "deu", "kor", "pol", "guj", "tha"], state: "Florida" },
    { languages: ["eng", "spa", "vie", "kor", "zh-CN", "guj", "fra", "amh", "hin", "hat", "rus", "ara", "por", "fas", "deu", "jpn"], state: "Georgia" },
    { languages: ["eng", "ilo", "tgl", "jpn", "zh-CN", "kor", "spa", "vie", "smo", "mah", "chk", "haw", "pon", "ceb", "ton", "lao"], state: "Hawaii" },
    { languages: ["eng", "spa", "zh-CN", "srp", "kor", "vie", "ara", "deu", "tgl", "rus", "fra", "jpn", "ron", "run", "fas", "ukr"], state: "Idaho" },
    { languages: ["eng", "spa", "pol", "zh-CN", "kor", "tgl", "ara", "rus", "guj", "urd", "vie", "ita", "hin", "fra", "ell", "deu"], state: "Illinois" },
    { languages: ["eng", "spa", "zh-CN", "deu", "pdc", "mya", "ara", "kor", "vie", "fra", "jpn", "nld", "tgl", "rus", "pan", "hin"], state: "Indiana" },
    { languages: ["eng", "spa", "zh-CN", "vie", "srp", "deu", "ara", "lao", "kor", "hin", "fra", "pdc", "tha", "tgl", "kar", "rus"], state: "Iowa" },
    { languages: ["eng", "spa", "vie", "zh-CN", "deu", "kor", "lao", "ara", "tgl", "mya", "fra", "jpn", "rus", "hmn", "fas", "swa"], state: "Kansas" },
    { languages: ["eng", "spa", "zh-CN", "deu", "vie", "ara", "srp", "jpn", "fra", "kor", "pdc", "nep", "orm", "rus", "tgl", "run"], state: "Kentucky" },
    { languages: ["eng", "spa", "fra", "vie", "zh-CN", "ara", "tgl", "kor", "por", "lao", "jpn", "urd", "deu", "fas", "rus", "tha"], state: "Louisiana" },
    { languages: ["eng", "fra", "spa", "zh-CN", "orm", "vie", "ara", "khm", "rus", "tgl", "deu", "tha", "din", "kor", "pol", "jpn"], state: "Maine" },
    { languages: ["eng", "spa", "zh-CN", "kor", "vie", "fra", "tgl", "rus", "amh", "bsq", "ibo", "yor", "urd", "fas", "hat", "por", "ara", "guj"], state: "Maryland" },
    { languages: ["eng", "spa", "por", "zh-CN", "hat", "vie", "rus", "ara", "khm", "fra", "ita", "kor", "ell", "pol", "hin", "guj"], state: "Massachusetts" },
    { languages: ["eng", "spa", "ara", "zh-CN", "syr", "vie", "sqi", "kor", "ben", "pol", "deu", "ita", "jpn", "rus", "srp", "tgl"], state: "Michigan" },
    { languages: ["eng", "spa", "hmn", "orm", "vie", "zh-CN", "rus", "lao", "amh", "kar", "deu", "khm", "ara", "fra", "kor", "tgl"], state: "Minnesota" },
    { languages: ["eng", "spa", "vie", "zh-CN", "fra", "ara", "cho", "tgl", "deu", "kor", "guj", "jpn", "rus", "pan", "ita", "hin"], state: "Mississippi" },
    { languages: ["eng", "spa", "zh-CN", "vie", "srp", "deu", "ara", "kor", "rus", "fra", "tgl", "pdc", "fas", "orm", "por", "amh"], state: "Missouri" },
    { languages: ["eng", "spa", "deu", "zh-CN", "jpn", "tgl", "fra", "rus", "kor", "ara", "tha", "nor", "vie", "ukr", "pdc", "ita"], state: "Montana" },
    { languages: ["eng", "spa", "vie", "zh-CN", "ara", "kar", "fra", "orm", "deu", "kor", "nep", "rus", "lao", "kur", "fas", "jpn"], state: "Nebraska" },
    { languages: ["eng", "spa", "tgl", "zh-CN", "kor", "vie", "amh", "tha", "jpn", "ara", "rus", "fra", "fas", "smo", "deu", "ilo"], state: "Nevada" },
    { languages: ["eng", "spa", "fra", "zh-CN", "nep", "vie", "por", "ell", "ara", "srp", "ind", "kor", "rus", "hat", "run", "pol"], state: "New Hampshire" },
    { languages: ["eng", "spa", "zh-CN", "kor", "por", "guj", "pol", "ita", "ara", "tgl", "rus", "hat", "hin", "vie", "fra", "urd"], state: "New Jersey" },
    { languages: ["eng", "spa", "nav", "vie", "deu", "zh-CN", "ara", "kor", "tgl", "jpn", "fra", "ita", "rus", "hin", "fas", "tha"], state: "New Mexico" },
    { languages: ["eng", "spa", "zh-CN", "rus", "hat", "kor", "ita", "yid", "ben", "pol", "ara", "fra", "urd", "tgl", "ell", "sqi"], state: "New York" },
    { languages: ["eng", "spa", "zh-CN", "vie", "kor", "fra", "ara", "hmn", "rus", "tgl", "guj", "khm", "deu", "hin", "lao", "jpn"], state: "North Caolina" },
    { languages: ["eng", "spa", "deu", "zh-CN", "orm", "vie", "run", "ara", "swa", "rus", "jpn", "nep", "fra", "kor", "tgl", "nor"], state: "North Dakota" },
    { languages: ["eng", "spa", "zh-CN", "deu", "ara", "pdc", "rus", "fra", "vie", "orm", "kor", "ita", "jpn", "nld", "ukr", "ron"], state: "Ohio" },
    { languages: ["eng", "spa", "vie", "zh-CN", "kor", "deu", "ara", "mya", "hmn", "tgl", "fra", "lao", "tha", "urd", "chr", "fas"], state: "Oklahoma" },
    { languages: ["eng", "spa", "vie", "zh-CN", "rus", "kor", "ukr", "jpn", "ara", "ron", "khm", "orm", "deu", "fas", "fra", "tha"], state: "Oregon" },
    { languages: ["eng", "spa", "zh-CN", "vie", "rus", "pdc", "kor", "ita", "ara", "fra", "deu", "guj", "pol", "hat", "khm", "por"], state: "Pennsylvania" },
    { languages: ["eng", "spa", "por", "zh-CN", "hat", "khm", "fra", "ita", "lao", "ara", "rus", "vie", "bsq", "ibo", "yor", "pol", "kor", "tgl"], state: "Rhode Island" },
    { languages: ["eng", "spa", "zh-CN", "vie", "kor", "fra", "tgl", "rus", "deu", "guj", "ara", "por", "jpn", "ukr", "hin", "khm"], state: "South Carolina" },
    { languages: ["eng", "spa", "deu", "zh-CN", "kar", "vie", "nep", "srp", "amh", "ffm", "tgl", "kor", "rus", "orm", "ukr", "fra"], state: "South Dakota" },
    { languages: ["eng", "spa", "ara", "zh-CN", "vie", "kor", "fra", "lao", "amh", "deu", "guj", "jpn", "tgl", "hin", "rus", "fas"], state: "Tennessee" },
    { languages: ["eng", "spa", "vie", "zh-CN", "kor", "ara", "urd", "tgl", "fra", "hin", "fas", "deu", "guj", "rus", "jpn", "lao"], state: "Texas" },
    { languages: ["eng", "spa", "zh-CN", "vie", "kor", "nav", "nep", "ton", "srp", "tgl", "deu", "rus", "ara", "khm", "fra", "jpn"], state: "Utah" },
    { languages: ["eng", "fra", "spa", "zh-CN", "vie", "nep", "srp", "deu", "orm", "ita", "ara", "rus", "tgl", "por", "jpn", "tha"], state: "Vermont" },
    { languages: ["eng", "spa", "kor", "vie", "zh-CN", "ara", "tgl", "fas", "amh", "urd", "fra", "rus", "hin", "deu", "ben", "bsq", "ibo", "yor"], state: "Virginia" },
    { languages: ["eng", "spa", "zh-CN", "vie", "kor", "rus", "tgl", "ukr", "khm", "jpn", "amh", "orm", "ara", "pan", "deu", "lao"], state: "Washington" },
    { languages: ["eng", "spa", "zh-CN", "fra", "deu", "ara", "vie", "kor", "jpn", "tgl", "ita", "tha", "nep", "fas", "rus", "urd"], state: "West Virginia" },
    { languages: ["eng", "spa", "hmn", "zh-CN", "deu", "ara", "rus", "kor", "vie", "pdc", "lao", "fra", "pol", "hin", "sqi", "tgl"], state: "Wisconsin" },
    { languages: ["eng", "spa", "zh-CN", "deu", "tgl", "fra", "kor", "vie", "ita", "rus", "ind", "jpn", "nep", "fas", "guj", "nav"], state: "Wyoming" }
]


// for (usState of usStatesLanguagesData) {
//     if (usState.state === 'Utah') {
//         console.log(usState)
//     }
// }