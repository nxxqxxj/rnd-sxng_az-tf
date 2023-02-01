output "app_name" {
  value = azurerm_linux_web_app.APP.name
}

output "app_url" {
  value = "https://${azurerm_linux_web_app.APP.default_hostname}"
}