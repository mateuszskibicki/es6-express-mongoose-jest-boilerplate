export const APIsuccess = (status, data) => {
  return {
    success: true,
    status,
    data
  };
};

export const APIerror = (status, data) => {
  return {
    success: false,
    status,
    data
  };
};
