<?php

/**
 * General Configuration
 *
 * All of your system's general configuration settings go in here.
 * You can see a list of the default settings in craft/app/etc/config/defaults/general.php
 */

return array(

	'*' => array (
		// Base site URL
		'siteUrl' => "https://feldmangallery.com/",
		'defaultImageQuality' => 80,

		// Environment-specific variables (see https://craftcms.com/docs/multi-environment-configs#environment-specific-variables)
		'environmentVariables' => array(),

		// Default Week Start Day (0 = Sunday, 1 = Monday...)
		'defaultWeekStartDay' => 0,

		// Enable CSRF Protection (recommended, will be enabled by default in Craft 3)
    'enableCsrfProtection' => true,

    //fuzzy search
    'defaultSearchTermOptions' => array(
      'subLeft' => true,
      'subRight' => true,
    ),

		// Whether "index.php" should be visible in URLs (true, false, "auto")
		'omitScriptNameInUrls' => 'false',

		// Control Panel trigger word
    'cpTrigger' => 'admin',

    'enableCsrfProtection' => true,

		// Dev Mode (see https://craftcms.com/support/dev-mode)
		'devMode' => false,
	),

	"feldmangallery.com" => array (
		'environmentVariables' => array(
			'basePath' => '/var/www/vhosts/l56p-wrkt.accessdomain.com/feldmangallery.com/',
            'baseUrl'  => 'https://feldmangallery.com/',
		),
	),

);
