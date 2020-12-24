# dns rrs
resource "digitalocean_domain" "default" {
  name = var.domain_name
}

resource "digitalocean_record" "fox_night_rr_apex" {
  domain = digitalocean_domain.default.name
  type = "A"
  name = "@"
  ttl = 900
  value = digitalocean_droplet.fox_night_droplet.ipv4_address
}

resource "digitalocean_record" "fox_night_rr_www" {
  domain = digitalocean_domain.default.name
  type = "A"
  name = "www"
  ttl = 900
  value = digitalocean_droplet.fox_night_droplet.ipv4_address
}

# ssh
resource "digitalocean_ssh_key" "fox_night_ssh_key" {
	name = "Fox Night SSH Key"
	public_key = file("${path.module}/../${local.ssh_key_public}")
}

# droplet
resource "digitalocean_droplet" "fox_night_droplet" {
	image  = "ubuntu-20-04-x64"
	name   = var.folder_name
	region = "nyc1"
	size   = "s-2vcpu-4gb"
	monitoring = true
	ssh_keys = [
		digitalocean_ssh_key.fox_night_ssh_key.fingerprint
	]
}
