<?php
/**
 * Template file for page.php
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
			the_content();
		endwhile;
		?>
	</main>

<?php
get_footer();
