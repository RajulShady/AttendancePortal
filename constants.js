const SuccessMessages = {
  RECORD_SUCCESS: 'Record has been added successfully',
  RECORD_DELETED: 'Record has been deleted successfully',
  RECORDS_FOUND: 'Records has been found successfully',
  ADMIN_LOGIN_SUCCESSFUL: 'Admin login successful',
  TEACHER_LOGIN_SUCCESSFUL: 'Teacher login successful',
  PASSWORD_CHANGED: 'Password changed successfully',
  UPDATE_SUCCESS: 'Record updated successfully',
  SIGNUP_SUCCESS: 'User has been signed up successfully',
};

const ErrorMessages = {
  INVALID_CEDENTIALS: 'Invalid credentials',
  INTERNAL_SERVER_ERROR: 'Internal server error',
  RECORD_NOT_EXIST: 'Record does not exist',
  INVALID_PASSCODE: 'Invalid password',
  SAME_PASSWORD: 'Do not use same password again',
  UNAUTHORIZED_ACCESS: 'Unauthorized for the request',
  ALREADY_EXISTS: 'User already exist',
};

const otherStrings = {
  adminId: '676711',
  adminPasscode: 'ap1223aa',
  adminRole: 1,
  secret: 'osdfhao$H$OHO$iohoiah$$$%hiohfg',
  saltrounds: 10,
};

module.exports = {
  SuccessMessages,
  ErrorMessages,
  otherStrings,
};

