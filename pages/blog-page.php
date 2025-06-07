<?php
/**
 * Template Name: Blog Page
 *
 * @package Pavel
 */

get_header();
?>

<main class="relative z-20 overflow-x-hidden">
	<?php
	the_content();
	pavel_render_contact_block();
	?>
</main>

<?php get_footer(); ?>
