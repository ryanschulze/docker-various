#!/bin/bash

version=${1:-'5.9.2'}
cd "${HOME}/src"
wget "https://storage.googleapis.com/collectd-tarballs/collectd-${version}.tar.bz2"
tar -xf "collectd-${version}.tar.bz2"

cd "${HOME}/src/collectd-${version}/contrib/redhat"
cp collectd.spec "${HOME}/rpmbuild/SPECS"
cd "${HOME}/rpmbuild/SPECS"
sed -i'' "s/^Version:.*$/Version:\t${version}/" collectd.spec
spectool -g -R collectd.spec
sudo yum -y install libudev-devel 
sudo yum-builddep -y collectd.spec

QA_RPATHS=0x0001 rpmbuild -bb collectd.spec 

