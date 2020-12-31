const checkMillionDollarIdea = (req, res, next) => {
  const numWeeks = req.numWeeks;
  const weeklyRevenue = req.weeklyRevenue;
  if (numWeeks && weeklyRevenue) {
    const totalValue = numWeeks * weeklyRevenue;
    if (totalValue >= 1000000) {
      next();
    } else {
      res.status(400).send(
          'Idea should have a minimum total value of 1,000,000',
      );
    }
  } else {
    res.status(400).send();
  }
};

module.exports = checkMillionDollarIdea;
