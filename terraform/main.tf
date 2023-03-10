##########  PROVIDER DECLARATION   ##########
terraform {
required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "=3.0.0"
    }
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
  sku_name            = "F1"
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
  service_plan_id = azurerm_service_plan.APPSP.id

  app_settings = {
    "WEBSITES_ENABLE_APP_SERVICE_STORAGE" = "false"
    "CLIENT_ID" = "${var.client_id}"
    "CLIENT_SECRET" = "${var.client_secret}"
  }
  site_config {
    always_on = false
    application_stack {
      docker_image     = "${var.docker_image}"
      docker_image_tag = "latest"
    }
  }
  tags = {
    "app"   = "RNDSXNG"
    "by"    = "nxxqxxj"
  }
}
