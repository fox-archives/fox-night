# Fox Night

Source repository for setting up a private movie sharing website.

## Features

-  Automated infrastructure management with Terraform and Ansible
-  Automated movie syncing

## Usage

### Prerequisites

-  [Just](https://github.com/casey/just)
-  [Ansible](https://github.com/ansible/ansible)
-  [Terraform](https://github.com/hashicorp/terraform)
-  Node 14
-  [Yarn](https://github.com/yarnpkg/yarn)

### Development

```sh
git clone https://github.com/eankeen/fox-night
cd fox-night
yarn install
yarn build && yarn start
```

### Deployment

-  Place DigitalOcean API Key in `terraform/terraform.tfvars`
-  Specify domain name in `terraform/terraform.tfvars`
   -  Ensure registrar is pointing to DigitalOcean's name servers (`ns1.digitalocean.com`). (We will handle the rest)
-  Check `./ansible/roles/common/vars/main.yml` and replace any if needed
   -  password is 'ubuntu' hashed. use `just prepare-password` if want to create new one

```sh
git clone https://github.com/eankeen/fox-night
cd fox-night
just prepare
just provision
```

## Uploading Media

1. Place Media in proper location

-  Captions: `./local/captions.vtt`
-  Movie Information: `./local/info.toml`
-  Movie: `./local/movie.mp4`

I recommend [cliflix](https://github.com/fabiospampinato/cliflix) for searching and downloading movies. Of course, ensure you're connected to a VPN

2. Sync to server

```sh
just provision_tag rsync-movie
```

-  Syncing will occur automatically on first provision
-  See `./ansible/roles/common/tasks/rsync.yml` for implementation detail. See `./old` to sync yourself

### Useful Information

1. Easily remote in

```sh
just ssh
```

2. Shut down infra to save on cost

```sh
just destroy
```
