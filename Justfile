SSH_KEY := "ssh_key"
REMOTE_USER := "root"
IP_ADDRESS := `cd terraform && terraform output fox_night_droplet_ip_address`

default: (provision_tag "rsync")

prepare-password:
	python -c 'import crypt,getpass; print(crypt.crypt(getpass.getpass(), crypt.mksalt(crypt.METHOD_SHA512)))' >| .password

prepare:
	ssh-keygen -t ed25519 -N '' -C 'movie' -f {{ SSH_KEY }} <<< y
	-cd terraform && terraform init


# TODO: ansible dynamic playbook
provision-helper:
	#!/usr/bin/env sh
	cat >| ./ansible/inventory.ini <<EOF
		[main]
		{{ IP_ADDRESS }} ansible_user=root ansible_ssh_private_key_file=../{{ SSH_KEY }}
	EOF

provision:
	cd terraform && terraform apply
	just provision-helper
	cd ansible && ansible-playbook -i inventory.ini playbook.yml

provision_tag tag='rsync-movie':
	cd ansible && ansible-playbook -i inventory.ini playbook.yml --tags {{ tag }}

destroy:
	cd terraform && terraform destroy

ssh:
	ssh -i {{ SSH_KEY }} {{ REMOTE_USER }}@{{ IP_ADDRESS }}
