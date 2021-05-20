module.exports.validateRegisterInput = (
  username,
  email,
  password,
  confirmPassword
) => {
  var errors = [];
 
  if (username.trim() === "") {
    var error={};
    error.message="Tên người dùng không được để trống";
    error.field="username"
    errors.push(error)
  }
  if (email.trim() === "") {
    var error={};
    error.message="Email không được để trống";
    error.field="email"
    errors.push(error)
  } else {
    const regEx =
      /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(regEx)) {
      var error={};
      error.message="Email phải là một địa chỉ email hợp lệ";
      error.field="email"
      errors.push(error)
    }
  }
  if (password === "") {
    var error={};
    error.message="Mật khẩu không được để trống";
    error.field="password"
    errors.push(error)
  } else if (password !== confirmPassword) {
    var error={};
    error.message="mật khẩu phải trùng khớp";
    error.field="password"
    errors.push(error)
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports.validateLoginInput = (username, password) => {
  var errors = "";
  if (username.trim() === "") {
    errors += "Tên người dùng không được để trống,username,";
  }
  if (password.trim() === "") {
    errors += "Mật khẩu không được để trống,password";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};


