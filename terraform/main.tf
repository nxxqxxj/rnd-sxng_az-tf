##########  PROVIDER DECLARATION   ##########
terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "=3.0.0"
    }
  }
  backend "azurerm" {
    resource_group_name  = "RG-TFRNDSXNG"
    storage_account_name = "rndsxngtfstate"
    container_name       = "terraformtfstate"
    key                  = "terraform.tfstate"
  }
}

provider "azurerm" {
  features {}
}

##########  RESOURCE GROUP   ##########
resource "azurerm_resource_group" "RG" {
  name     = "RG-${var.prefix}"
  location = var.location
  tags = {
    "app"   = "RNDSXNG"
    "by"    = "nxxqxxj"
  }
}

##########  SERVICE PLAN   ##########
resource "azurerm_service_plan" "APPSP" {
  name                = "APPSP-${var.prefix}"
  location            = azurerm_resource_group.RG.location
  resource_group_name = azurerm_resource_group.RG.name
  os_type             = "Linux"
  sku_name            = "B1"
  tags = {
    "app"   = "RNDSXNG"
    "by"    = "nxxqxxj"
  }
}

##########  APP LWA   ##########
resource "azurerm_linux_web_app" "APP" {
  name                = "APP-${var.prefix}"
  location            = azurerm_resource_group.RG.location
  resource_group_name = azurerm_resource_group.RG.name
  service_plan_id     = azurerm_service_plan.APPSP.id

  app_settings = {
    "WEBSITES_ENABLE_APP_SERVICE_STORAGE" = "false"
    "REACT_APP_CLIENT_ID"                 = "${var.client_id}"
    "REACT_APP_CLIENT_SECRET"             = "${var.client_secret}"
  }
  site_config {
    application_stack {
      docker_image_name     = "${var.docker_image}:latest"
    }
  }
  tags = {
    "app"   = "RNDSXNG"
    "by"    = "nxxqxxj"
  }
}
