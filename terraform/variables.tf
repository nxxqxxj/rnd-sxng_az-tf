variable "prefix" {
  type        = string
  description = "The prefix used for all resources"
}

variable "location" {
  type        = string
  description = "The Azure location where all resources in this example should be created"
}

variable "docker_image" {
  type        = string
  description = "The docker image that we'll use"
}