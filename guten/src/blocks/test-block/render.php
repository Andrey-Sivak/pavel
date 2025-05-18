<?php
$title = $attributes['title'] ?? '';

$wrapper_attributes = get_block_wrapper_attributes([
	'class' => 'pm-wrap'
]);
$base_class = 'wp-block-pavel-test-block';


?>

<section
	<?php echo $wrapper_attributes; ?>
>
	<h1>test</h1>
</section>
