<?php
$languages  = apply_filters( 'wpml_active_languages', null, array( 'skip_missing' => 0 ) );
$base_class = 'pm-languages';

if ( ! empty( $languages ) ) :
	?>
	<div class="<?php echo $base_class; ?>"
		 aria-label="<?php echo esc_attr__( 'Language switcher', 'pm' ); ?>"
	>
		<div class="<?php echo $base_class . '-active'; ?>">
			<?php foreach ( $languages as $lang ) : ?>
				<?php
				if ( $lang['active'] ) {
					if ( ! empty( $lang['country_flag_url'] ) ) {
						echo '<span class="wpml-lang-code" lang="' . esc_attr( $lang['language_code'] ) . '">' . esc_html( strtoupper( $lang['language_code'] ) ) . '</span>';
						echo '<img src="' . esc_url( $lang['country_flag_url'] ) . '" width="18" height="12" loading="lazy" alt="' . esc_attr( $lang['translated_name'] ) . '" class="wpml-flag">';
					}
				}
			endforeach;
			?>
		</div>
		<div class="<?php echo $base_class . '-list-wrap'; ?>">
			<ul class="<?php echo $base_class . '-list'; ?>">
				<?php
				foreach ( $languages as $lang ) :
					if ( ! $lang['active'] ) :
						if ( ! empty( $lang['country_flag_url'] ) ) :
							?>
							<li>
								<a href="<?php echo esc_url( $lang['url'] ); ?>"
								   title="<?php echo esc_attr( $lang['translated_name'] ); ?>"
								   lang="<?php echo esc_attr( $lang['language_code'] ); ?>"
								>
									<span><?php echo esc_html( strtoupper( $lang['language_code'] ) ); ?></span>
									<img src="<?php echo esc_url( $lang['country_flag_url'] ); ?>"
										 alt="<?php echo esc_attr( $lang['translated_name'] ); ?>"
										 loading="lazy"
										 width="18"
										 height="12"
										 class="wpml-flag">
								</a>
							</li>
							<?php
						endif;
					endif;
				endforeach;
				?>
			</ul>
		</div>
	</div>
<?php endif; ?>
