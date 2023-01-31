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
resource "azurerm_resource_group" "RG-RNDSXNG" {
  name     = "RG-RNDSXNG"
  location = "East US"
  tags = {
    "app"   = "RND-SXNG"
    "proy"  = "RND-SXNG_AZ-TF"
    "by"    = "nxxqxxj"
  }
}

##########  APP SERVICE PLAN   ##########
resource "azurerm_app_service_plan" "APPSP-RNDSXNG" {
  name                = "APPSP-RNDSXNG"
  location            = azurerm_resource_group.RG-RNDSXNG.location
  resource_group_name = azurerm_resource_group.RG-RNDSXNG.name

  sku {
    tier = "Free"
    size = "F1"
  }
}