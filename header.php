<?php
/**
 * The header template for the theme
 *
 * This file contains the HTML head section, opening body tag, and top-level site markup
 * such as the site header and navigation. It is included in all front-end pages via get_header().
 *
 * @package Pavel
 */

declare(strict_types=1);

$pavel_body_class = 'bg-secondary';
?>

<!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="profile" href="https://gmpg.org/xfn/11">

	<?php wp_head(); ?>
</head>
<body <?php body_class( $pavel_body_class ); ?>>
<?php wp_body_open(); ?>
	<header id="pm-header" class="pm-header pm-wrap fixed top-0 left-0 w-full z-50 pt-6.5 pb-5 transition-all duration-300">
		<div class="pm-container flex items-center justify-between">
			<?php get_template_part( '/template-parts/logo' ); ?>

			<?php
			if ( has_nav_menu( 'menu-1' ) ) {
				wp_nav_menu(
					array(
						'theme_location' => 'menu-1',
						'menu_id'        => 'primary-menu',
						'container'      => false,
						'menu_class'     => 'pm-nav-menu flex items-center',
						'fallback_cb'    => false,
					)
				);
			}
			?>

			<a href="#contact" class="pm-button pm-header__button">
				<span>Let’s connect</span>
				<span class="pm-button__arrow">
					<?php get_template_part( '/vector-images/button-arrow' ); ?>
				</span>
			</a>
		</div>
	</header>
