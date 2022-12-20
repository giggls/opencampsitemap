# Open Camping Map

Usually it should not be necessary to install this code.

Just use the instance at https://opencampingmap.org/ instead.

If you want to install this stuff on your own machine follow these (likely
incomplete) instructions for Debian 11.

* Install osmpoidb from https://github.com/giggls/osmpoidb

* Install required packages
``
apt install libapache2-mod-wsgi-py3 podman inkscape xmlstarlet wget unzip apache2
``

* Clone repository into /opt/opencampingmap
``
git clone https://github.com/giggls/opencampsitemap /opt/opencampingmap
``

* Call make
``
cd /opt/opencampingmap
make
``

* Enable and run podman container for nodejs part of the code
``
cp campmap-srv.service /etc/systemd/system/campmap-srv.service
systemctl daemon-reload
systemctl enable campmap-srv.service
systemctl start campmap-srv.service
``

* Configure Apache2 vhost

``
	RewriteEngine on

        WSGIApplicationGroup %{GLOBAL}
        WSGIScriptAlias /sitemap /opt/osm2pgsql/osmpoidb/sitemap.cgi
        WSGIScriptAlias /getcampsites /opt/osm2pgsql/osmpoidb/get-campsites.cgi

        <Location />
          ProxyPass http://localhost:54445/
          ProxyPassReverse http://localhost:54445/
          Order allow,deny
          Allow from all
          RequestHeader set X-Forwarded-Proto "https"
        </Location>
        <Location "/getcampsites">
                Header set Access-Control-Allow-Origin "*"
                Options +ExecCGI -MultiViews +SymLinksIfOwnerMatch
                Require all granted
                ProxyPass !
        </Location>
        <Location /sitemap>
                ProxyPass !
                Require all granted
        </Location>
	</VirtualHost>
``
