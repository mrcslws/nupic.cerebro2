var ThreeDVisualization = AbstractVisualization.extend(function(base) {
    return {
        initCamera: function(width, height) {
            var viewAngle = 45,
                aspect = width / height,
                near = 0.1,
                far = 10000;
                camera = new THREE.PerspectiveCamera(viewAngle, aspect, near, far);

            camera.position.y = 4000;
            camera.up.set(0, 0, 1);

            return camera;
        },

        getInputDrawing: function(scene) {
            return new ThreeDDrawing(scene, 0, 0, -500);
        },

        getOutputDrawing: function(scene) {
            return new ThreeDDrawing(scene, 0, 0, 0);
        }
    };
});
