<?php
/**
 * Template file for index.php
 *
 * This file is part of the Pavel theme.
 *
 * @package Pavel
 */

declare(strict_types=1);?>

<main class="site-main">
<?php
while ( have_posts() ) :
	the_post();
	get_template_part( '/template-parts/post', 'card' );
	endwhile;
?>
</main>

<?php
get_footer();
