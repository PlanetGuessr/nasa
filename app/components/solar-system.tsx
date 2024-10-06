export default function SolarSystem() {
    return (
        <>
            <a-entity id="centro" position="0 0 -12">
                <a-sphere
                    animation="property:rotation; dur:100000; easing:linear; to:0 360 0; loop:true;"
                    id="sun"
                    material="src:textures/sun.jpg"
                    position="0 0 0"
                    color="#FFC65D"
                    radius="2.5">
                </a-sphere>
            </a-entity>
        </>
    );
}