# Fox Night

Source repository for setting up a private movie sharing website.

## Features

- Simple HTTPS interface for movie-watching
- Automated infrastructure management with Terraform and Ansible (so you can easily shutdown/start server to save cost)
- Automated movie syncing

## Usage

### Prerequisites

- [Just](https://github.com/casey/just)
- [Ansible](https://github.com/ansible/ansible)
- [Terraform](https://github.com/hashicorp/terraform)
- Node 14
- [Yarn](https://github.com/yarnpkg/yarn)

### Development

```sh
git clone https://github.com/eankeen/fox-night
cd fox-night
yarn install
yarn build && yarn start
```

### Deployment

```sh
git clone https://github.com/eankeen/fox-night
cd fox-night
just prepare
just provision
```

Variables contained within this IAC should be flexible enough to cater to you. They are contained in two locoations: `./ansible/roles/common/vars/main.yml' and `./terraform/terraform.tfvars`; override or replace them however you wish

- `password`, `user`

  - default password and user for the VPS

- `domain_name`

  - domain name. Used for Caddy's automatic HTTPS certification registration
  - Ensure registrar is pointing to DigitalOcean's name servers (`ns1.digitalocean.com`, etc). (We will handle the rest)

- `folder_name`

  - folder name within `/home/{{ user }}` to rsync the source code to. This also changes the name of the systemd service file

- `web_username`

  - username to enter when navigating to site (by defualt, `user`)

- `web_password`

  - password to enter when navigating to site (by default, the same value as `folder_name`)

- `node_port`

  - port that the NodeJS server attaches to

- `digital_ocean_token`

  - your Digital Ocean API key

## Uploading Media

1. Place Media in proper location

- Captions: `./local/captions.vtt`
- Movie Information: `./local/info.toml`
- Movie: `./local/movie.mp4`

I recommend [cliflix](https://github.com/fabiospampinato/cliflix) for searching and downloading movies. Of course, ensure you're connected to a VPN

2. Sync to server

```sh
just provision_tag rsync-movie
```

- Syncing will occur automatically on first provision
- See `./ansible/roles/common/tasks/rsync.yml` for implementation detail. See `./old` to sync yourself

### Useful Information

1. Easily remote in

```sh
just ssh
```

2. Shut down infra to save on cost

```sh
just destroy
```
