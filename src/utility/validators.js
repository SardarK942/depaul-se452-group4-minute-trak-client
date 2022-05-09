const validation = {
  email: (value) => {
    // checking email format
    const reg =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return reg.test(String(value).toLowerCase());
  },
  password: (value) => {
    // Must be 8 characters or more
    return value.toString().length >= 8;
  },
};

export default validation;
