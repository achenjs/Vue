#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time    : 2017/2/16 上午10:36
# @Author  : Rain
# @Desc    : 部署工具类，需在 Python2 环境下运行：fab build/fab deploy
# @File    : fabfile.py

import os

from datetime import datetime
from fabric.api import *


env.user = 'root'
env.sudo_user = 'root'
env.hosts = ['apl.apluslabs.com']
env.key_filename = '~/.ssh/apl_test'

_TAR_FILE = 'titan.tar.gz'
_REMOTE_TMP_TAR = '/tmp/%s' % _TAR_FILE

_REMOTE_ROOT_DIR = '/root'
_REMOTE_BASE_DIR = '/root/Repository'

_nginx_config_path = '/etc/nginx/sites-available'

def _current_path():
    return os.path.abspath('.')


def _now():
    return datetime.now().strftime('%y-%m-%d_%H.%M.%S')


def build():

    local('rm -f dist/%s' % _TAR_FILE)
    with lcd(os.path.join(_current_path(), 'dist')):
        cmd = ['tar', '-zcf', _TAR_FILE, '.']
        local(' '.join(cmd))


def deploy():

    newdir = 'titan-%s' % _now()
    run('rm -f %s' % _REMOTE_TMP_TAR)
    put('dist/%s' % _TAR_FILE, _REMOTE_TMP_TAR)
    with cd(_REMOTE_BASE_DIR):
        sudo('mkdir %s' % newdir)
    with cd('%s/%s' % (_REMOTE_BASE_DIR, newdir)):
        sudo('tar -xzf %s' % _REMOTE_TMP_TAR)
    with cd(_REMOTE_ROOT_DIR):
        sudo('rm -rf titan')
        sudo('ln -s %s/%s titan' % (_REMOTE_BASE_DIR, newdir))
        sudo('sudo service nginx restart')


def deploy_configs():
    put('default', _nginx_config_path)
    sudo('sudo supervisorctl restart apl')
    sudo('sudo service nginx restart')

