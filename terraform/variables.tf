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

variable "client_id" {
  type        = string
  description = "Client ID for using Spotify API"
}

variable "client_secret" {
  type        = string
  description = "Client Secret for using Spotify API"
}