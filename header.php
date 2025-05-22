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

$pavel_body_class = 'bg-secondary pm-modal-open pm-contact';
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
	<header id="pm-header" class="pm-header pm-wrap fixed top-0 left-0 w-full z-50 xl:pt-6.5 pt-5 xl:pb-5 pb-4.5 transition-all duration-300">
		<div class="pm-container lg:flex grid grid-cols-2 lg:gap-0 gap-5 items-center lg:justify-between">
			<?php get_template_part( '/template-parts/logo' ); ?>

			<button class="mob-burger-btn"
					type="button"
					aria-expanded="false"
					aria-controls="mobile-menu"
					title="<?php echo esc_attr__( 'Toggle mobile navigation', 'pm' ); ?>">
				<span class="pm-visually-hidden"><?php echo esc_html__( 'Menu', 'pm' ); ?></span>
				<span class="mob-burger-btn-top"></span>
				<span class="mob-burger-btn-center"></span>
				<span class="mob-burger-btn-bottom"></span>
			</button>

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

			<div class="lg:flex grid items-center lg:gap-2 gap-4 pm-header__right">
				<a href="#contact" class="pm-button pm-button-primary pm-header__button">
					<span>Let’s connect</span>
					<span class="pm-button__arrow"><?php get_template_part( '/vector-images/button-arrow' ); ?></span>
				</a>

				<?php get_template_part( '/template-parts/language-switcher' ); ?>
			</div>
		</div>
	</header>
