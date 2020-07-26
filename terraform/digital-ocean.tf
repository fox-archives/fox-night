terraform {
	required_version = ">= 0.13"
	required_providers {
		digitalocean = {
			source = "digitalocean/digitalocean"
			version = "2.3.0"
		}
	}
}

provider "digitalocean" {
	token = var.digital_ocean_token
}
