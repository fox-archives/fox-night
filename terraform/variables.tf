locals {
	ssh_key_public = "ssh_key.pub"
}

variable "digital_ocean_token" {
	type = string
}

variable "domain_name" {
	type = string
}
