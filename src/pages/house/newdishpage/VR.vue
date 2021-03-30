<template>
	<view>
		<!-- // 创建正交相机 -->
		const camera = new THREE.OrthographicCamera(
		-window.innerWidth / 200,
		window.innerWidth /200 ,
		window.innerHeight/ 200,
		-window.innerHeight/ 200,
		1,
		1000
		);
		<!-- // 创建透视相机 -->
		const camera = new THREE.PerspectiveCamera(
		90,
		window.innerWidth / window.innerHeight,
		1,
		10000
		);
		const renderer = new THREE.WebGLRenderer();
		renderer.setSize(window.innerWidth, window.innerHeight); // canvas大小
		document.body.appendChild(renderer.domElement);
	</view>
</template>

<script>
</script>

<style>
</style>
