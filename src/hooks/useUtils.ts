const hookSettings = {
  defaultTruncatedTextEnding: "...",
  // eslint-disable-next-line
  emailRegex:
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  // eslint-disable-next-line
  urlRegex:
    /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/,
  telNumberRegex: /[+-\d()\s]/,
  postalCodeRegex: /^[0-9a-zA-Z\s]*$/,
  // strongPassword: /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/,
  passwordRegex: {
    lowerCase: /[a-z]/,
    upperCase: /[A-Z]/,
    number: /[0-9]/,
    special: /[$@$!%*?&]/,
    minLength: 8,
    maxLength: 64,
  },
};

/**
 * Defines the useUtils hook
 */
const useUtils = () => {
  const {
    defaultTruncatedTextEnding,
    emailRegex,
    urlRegex,
    telNumberRegex,
    passwordRegex,
    postalCodeRegex,
  } = hookSettings;

  /**
   * Truncates the input
   */
  const truncateText = (str: string, length: number, ending: string) => {
    if (length === null) length = 100;
    const endingString = ending ? ending : defaultTruncatedTextEnding;

    if (str.length > length) {
      return str.substr(0, length - endingString.length) + endingString;
    } else {
      return str;
    }
  };

  /**
   * Compares the endDate of the experiences
   * Used to compare work exp, educations, certificates.
   * Sort order (latest first, oldest last)
   */
  const compareDates = (item1: Date | string, item2: Date | string) => {
    const dateA = new Date(item1);
    const dateB = new Date(item2);
    let comparison = 0;

    if (dateA < dateB) {
      comparison = 1;
    } else if (dateA > dateB) {
      comparison = -1;
    }
    return comparison;
  };

  const isDate = (date: string) => {
    // @ts-ignore
    return new Date(date) !== "Invalid Date" && !isNaN(new Date(date));
  };

  /**
   * Checks if the input is empty
   */
  const isEmpty = (value: any) => {
    if (isDate(value)) return false;

    return (
      value === undefined ||
      value === null ||
      (typeof value === "object" && Object.keys(value).length === 0) ||
      (typeof value === "string" && value.trim().length === 0) ||
      (Array.isArray(value) && value.length === 0)
    );
  };

  /**
   * Checks if the input is a valid email
   */
  const isEmail = (value: string) => {
    if (!value.match(emailRegex)) return false;
    return true;
  };

  /**
   * Checks if the input is a valid phone number
   */
  const isPhoneNum = (value: string) => {
    if (!value.match(telNumberRegex)) return false;
    return true;
  };

  /**
   *  Checks if the input contains digits
   */
  const hasDigits = (value: string, target: number) => {
    const isDigit = (input: string) => /^\d+$/.test(input);
    let digitCount = 0;

    for (var i = 0; i < value.length; i++) {
      if (isDigit(value[i])) digitCount++;
    }
    if (digitCount < target) return false;
    return true;
  };

  /**
   * Checks if the input is a secure password (weak version)
   */
  const isSecurePassword = (value: string) => {
    if (
      value.match(passwordRegex.lowerCase) &&
      value.match(passwordRegex.upperCase) &&
      value.match(passwordRegex.number) &&
      value.match(passwordRegex.special) &&
      value.length > passwordRegex.minLength
    ) {
      return true;
    }

    return false;
  };

  const hasUppercase = (value: string) => {
    if (value.match(passwordRegex.upperCase)) return true;
    return false;
  };

  /**
   * Checks if the input is a number
   */
  const isNumber = (num: number) => {
    const not_a_number = isNaN(num);
    if (not_a_number) return false;
    return true;
  };

  /**
   * Checks if 2 strings are equal
   */
  const equals = (str1: string, str2: string) => {
    return str1 === str2;
  };

  /**
   * Checks if the input is a valid postal code
   */
  const isPostalCode = (value: string) => {
    const correctFormat = postalCodeRegex.test(value);
    if (!correctFormat) return false;
    return true;
  };

  /**
   * Checks if the input has a certain length
   */
  const isLength = (data: string, options: { min: number; max: number }) => {
    let { min, max } = options;

    if (min > max)
      throw new Error(
        "You provided a min value that is higher than the max value."
      );
    if (!min) min = 1;
    if (!max) max = 1;
    if (data.length < min) return false;
    if (data.length > max) return false;
    return true;
  };

  /**
   * Checks if the input is a valid url
   */
  const isUrl = (url: string) => {
    if (!url.match(urlRegex)) return false;
    return true;
  };

  /**
   * Sorts by id - integers
   */
  const sortById = (item1: { id: string }, item2: { id: string }) => {
    let comparison = 0;

    if (item1.id < item2.id) {
      comparison = -1;
    } else if (item1.id > item2.id) {
      comparison = 1;
    }
    return comparison;
  };

  /**
   * Sorts by name
   */
  const sortByName = (item1: { name: string }, item2: { name: string }) => {
    let comparison = 0;

    if (item1.name < item2.name) {
      comparison = -1;
    } else if (item1.name > item2.name) {
      comparison = 1;
    }
    return comparison;
  };

  /**
   * Handles formatting a number to have commas
   */
  const formatNumber = (number: number) => {
    if (!number) return;
    var regex = /(\d)(?=(\d{3})+(?:(\.)\d+)?$)/g;
    return (+number).toFixed(2 || 0).replace(regex, function (a, b, c, d) {
      return d ? b + "," : b;
    });
  };

  return {
    formatNumber,
    truncateText,
    compareDates,
    sortById,
    sortByName,
    isEmpty,
    isUrl,
    isEmail,
    isPhoneNum,
    equals,
    isLength,
    isNumber,
    isSecurePassword,
    isPostalCode,
    hasDigits,
    hasUppercase,
  };
};

export { useUtils };
