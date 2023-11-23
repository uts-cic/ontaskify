# OnTaskify

[![Quality Gate Status](https://sonarqube.utscic.edu.au/api/project_badges/measure?project=uts-cic_ontaskify_AYv01JOdSoFdTa0K0K7B&metric=alert_status&token=sqb_fabbfa4dbf5b1d8cd8bb531a6ed1447876e24fab)](https://sonarqube.utscic.edu.au/dashboard?id=uts-cic_ontaskify_AYv01JOdSoFdTa0K0K7B)

OnTaskify is a utility to assist the use of OnTask to provide personalised feedback to students at scale, based on their Canvas activity traces. For details of the UTS:CIC OnTask project see [https://cic.uts.edu.au/tools/ontask/](https://cic.uts.edu.au/tools/ontask/)

## Installation

### Requirements

- Angular
- Terraform (for AWS deployment)

### Steps

1. Clone the repository.
2. For local development:
   - Copy `proxy.conf.json.template` to `proxy.conf.json`.
   - Specify your Canvas domain in the copied file.
3. Terraform scripts are provided for deploying the Angular app to AWS S3, with a CloudFront distribution.
   - Ensure the Canvas origin is added to address CORS issues by proxying requests to the Canvas instance from the same domain.

## Terraform Setup (for AWS deployment)

Follow these steps to configure and use Terraform for managing our infrastructure:

### Navigate to Terraform Directory

```bash
cd terraform
```

### Configure Backend

Copy the `terraform.template.tfbackend` file to a new file named `terraform.tfbackend`. Edit this new file to include your specific backend configuration.

### Create Terraform Variable File

Create a `terraform.tfvars` file with your AWS credentials and project-specific variables. Replace the placeholders with your actual details:

```bash
aws_access_key = "your_aws_access_key"
aws_secret_key = "your_aws_secret_key"
aws_region     = "your_aws_region"
ontaskify_bucket          = "my-ontaskify"
ontaskify_name            = "Ontaskify"
ontaskify_domain          = "my-ontaskify.utscic.edu.au"
ontaskify_certificate_arn = "your_certificate_arn"
canvas_domain             = "my-canvas.domain"
```

**Important:** Do not commit `terraform.tfvars` to your version control system.

### Initialize Terraform

Initialize Terraform to set up the necessary providers and backend:

```bash
terraform init -backend-config=terraform.tfbackend
```

### Apply Configuration

Apply the Terraform configuration to create or update the infrastructure:

```bash
terraform apply
```

### Additional Commands

Use other Terraform commands as needed for different operations:

- `terraform plan` to preview changes.
- `terraform destroy` to remove resources.

**Note:** Ensure Terraform is installed and configured correctly on your system. Familiarize yourself with the Terraform files and documentation to understand the infrastructure being managed.

## Development

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.0.0.

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Usage

1. On the home screen, follow the instructions to obtain a Canvas access token.
2. Paste the token into the app.
3. Select a course from the list of courses you have access to.
4. View the base table of students featuring columns: `student_id`, `first_name`, `last_name`, `email`.
5. Add additional columns by selecting a data source for each new column.
6. Export the final table to CSV as needed.
7. Toggle column visibility by interacting with the column names.

## License

This project is licensed under the MIT License.

## Maintainer

UTS:CIC (Connected Intelligence Centre @ University of Technology, Sydney)

---

_OnTaskify: Streamlining feedback in education with innovative technology._
