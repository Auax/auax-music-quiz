const SVGLogo = (props) => {

    const width = props.width || "40";
    const height = props.height || "40";

    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1028 1028"
            width={width} height={height} stroke="currentColor"
            class="text-base-200-content ml-3 lg:ml-2 hover:scale-110 ease-in duration-75">
            <defs><clipPath id="_clipPath_yIrMOZXHCGKYzlTTE44mHhzImaVYbfsN">
                <rect width="1028" height="1028"></rect></clipPath>
            </defs>
            <g clip-path="url(#_clipPath_yIrMOZXHCGKYzlTTE44mHhzImaVYbfsN)">
                <path d=" M 797.969 534.204 L 797.969 534.204 C 917.614 549.803 1010 649.516 1010 770.035 C 1010 901.371 900.283 1008 765.142 1008 C 635.426 1008 529.134 909.761 520.824 785.723 L 520.824 785.723 C 488.174 794.106 453.892 798.565 418.547 798.565 C 197.479 798.565 18 624.133 18 409.283 C 18 194.432 197.479 20 418.547 20 C 639.614 20 819.093 194.432 819.093 409.283 C 819.093 452.973 811.672 494.992 797.969 534.204 Z  M 797.969 534.204 L 797.969 534.204 C 787.233 532.793 776.274 532.069 765.142 532.069 C 630.001 532.069 520.284 638.698 520.284 770.035 C 520.284 775.307 520.461 780.54 520.824 785.723 L 520.824 785.723 C 650.885 752.4 755.138 657.025 797.969 534.204 Z " fillRule="evenodd" fill="currentColor">
                </path>
            </g>
        </svg>
    );
}
export default SVGLogo;
