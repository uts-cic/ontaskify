variable "aws_access_key" {
  type        = string
  description = "AWS access key"
}
variable "aws_secret_key" {
  type        = string
  description = "AWS secret key"
}
variable "aws_region" {
  type        = string
  description = "AWS region"
}

variable "ontaskify_bucket" {
  type        = string
  description = "S3 bucket"
}
variable "ontaskify_name" {
  type        = string
  description = "Project name"
}
variable "ontaskify_domain" {
  type        = string
  description = "Domain name for OnTaskify service"
}
variable "ontaskify_certificate_arn" {
  type        = string
  description = "ARN for ACM certificate"
}

variable "canvas_domain" {
  type        = string
  description = "Domain name for OnTaskify service"
}
