<?php
/**
 * Plugin Name:       Dynamic Map Card
 * Description:       Example block written with ESNext standard and JSX support – build step required.
 * Requires at least: 5.8
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       dynamic-map-card
 *
 * @package           create-block
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function create_block_dynamic_map_card_block_init() 
{
	register_block_type( __DIR__ . '/build', array(
		'render_callback' => 'render_dynamic_map_card',
	)
);
}

add_action( 'init', 'create_block_dynamic_map_card_block_init' );

function render_dynamic_map_card ( $attributes ) {
	ob_start();
	?>
	<div class="container">
		<div class="card">
			<div class="imgBx">
				<i class="wi ' . <?php echo $attributes['weatherIcons']; ?> . '"></i>
			</div>
			<div class="contentBx">
			<h2><?php echo $attributes['cityName']; ?></h2>
			<div class="size">
				<h3>Temperature : </h3>
				<span><?php echo $attributes['actualTemp']; ?><sup>&deg;</sup></span>
			</div>
			<div class="size">
				<h3>Min Temp. : </h3>
				<span><?php echo $attributes['minTemp']; ?><sup>&deg;</sup></span>
			</div>
			<div class="size">
				<h3>Max Temp. : </h3>
				<span><?php echo $attributes['maxTemp']; ?><sup>&deg;</sup></span>
			</div>
		</div>
	</div>
	<?php
	return ob_get_clean();
}