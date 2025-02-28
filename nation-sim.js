const issues = [
  {
    question: "A major corporation wants to build a factory, but it may harm the environment.",
    choices: [
      { text: "Approve the factory to boost the economy.", effects: { economy: 10, environment: -10 } },
      { text: "Reject the factory to protect nature.", effects: { environment: 10, economy: -10 } },
      { text: "Allow the factory with regulations.", effects: { economy: 5, environment: 5 } },
    ]
  },
];

function createNation(name) {
  const nation = {
    name,
    economy: 50,
    military: 50,
    environment: 50,
    civilRights: 50,
  };
  localStorage.setItem("nation", JSON.stringify(nation));
  return nation;
}

function getNation() {
  return JSON.parse(localStorage.getItem("nation")) || null;
}

function getRandomIssue() {
  return issues[Math.floor(Math.random() * issues.length)];
}

function applyDecision(choiceIndex) {
  const nation = getNation();
  if (!nation) return;

  const issue = getRandomIssue();
  const effects = issue.choices[choiceIndex].effects;

  nation.economy = Math.max(0, Math.min(nation.economy + (effects.economy || 0), 100));
  nation.military = Math.max(0, Math.min(nation.military + (effects.military || 0), 100));
  nation.environment = Math.max(0, Math.min(nation.environment + (effects.environment || 0), 100));
  nation.civilRights = Math.max(0, Math.min(nation.civilRights + (effects.civilRights || 0), 100));

  localStorage.setItem("nation", JSON.stringify(nation));
  return nation;
}

// Example usage
console.log(createNation("Testland"));
console.log(getRandomIssue());
console.log(applyDecision(0));
