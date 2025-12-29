// This script simulates reading config files and triggering the deployment
// We point this to the specific function we created in your project
const DEPLOY_FUNCTION = "`test-manasag-r3.dataform_poc.deploy_semantic_model`";

// Define dummy models to test the deployment
// In a real scenario, these could be read from JSON files in the repo
const models = [
  {
    name: "customer_lifetime_value",
    type: "semantic_model",
    config: { description: "Calculates CLV for retail users" }
  },
  {
    name: "daily_sales_revenue",
    type: "semantic_model",
    config: { description: "Aggregates daily revenue" }
  }
];

// Loop through models and create a SQL query for each
models.forEach(model => {
  operate(`deploy_${model.name}`)
    .queries(`
      SELECT ${DEPLOY_FUNCTION}(
        PARSE_JSON('${JSON.stringify(model)}')
      )
    `);
});
