const fiveHundredErrorMessage = () => {
  console.error(err.message);
  response.status(500).send(`Server error`);
};
