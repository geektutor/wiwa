const Loader = ({close}) => {
  return (
    <div className={`pre-loader ${close ? "close" : ""}`}>
      <div id="wrap">
        <svg viewBox="0 0 99 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M28.812 9H28.0376L27.8438 9.74974L25.1886 20.022L22.1758 9.71933L21.9654 9H21.216H16.32H15.5687L15.3595 9.72164L12.3743 20.0221L9.69155 9.74737L9.49641 9H8.72399H3.46799H2.09803L2.51556 10.3048L8.27556 28.3048L8.49803 29H9.22799H14.916H15.6538L15.8715 28.2951L18.7138 19.0913L21.6677 28.3053L21.8904 29H22.62H28.308H29.0379L29.2604 28.3048L35.0204 10.3048L35.4379 9H34.068H28.812ZM43.0591 10V9H42.0591H37.1271H36.1271V10V28V29H37.1271H42.0591H43.0591V28V10ZM70.5073 9H69.7329L69.5391 9.74974L66.8839 20.022L63.8711 9.71933L63.6608 9H62.9113H58.0153H57.264L57.0548 9.72164L54.0696 20.0221L51.3869 9.74737L51.1917 9H50.4193H45.1633H43.7933L44.2109 10.3048L49.9709 28.3048L50.1933 29H50.9233H56.6113H57.3491L57.5668 28.2951L60.4091 19.0913L63.363 28.3053L63.5858 29H64.3153H70.0033H70.7333L70.9557 28.3048L76.7157 10.3048L77.1332 9H75.7633H70.5073ZM87.1941 14.8111L87.2013 14.8183L87.2087 14.8254C87.5475 15.1507 87.7754 15.6307 87.7991 16.3834L82.4187 17.4783C82.4172 17.4786 82.4157 17.4789 82.4141 17.4792C80.6804 17.8163 79.2432 18.4702 78.1989 19.5121C77.1215 20.5623 76.6052 21.9227 76.6052 23.5C76.6052 25.3294 77.2293 26.8548 78.5667 27.9186L78.5764 27.9264L78.5864 27.9339C79.8915 28.92 81.5785 29.36 83.5452 29.36C84.8046 29.36 86.0251 29.1181 87.1998 28.6375L87.1999 28.6376L87.2102 28.6332C87.9206 28.3333 88.5504 27.9491 89.0902 27.4779C89.4186 27.9007 89.8273 28.2576 90.3151 28.5408L90.315 28.5409L90.3269 28.5476C91.2685 29.0772 92.343 29.324 93.5172 29.324C94.5579 29.324 95.5025 29.1514 96.3044 28.7504L96.8008 28.5022L96.8528 27.9497L97.1408 24.8897L97.2846 23.3621L95.829 23.8473C95.5783 23.9309 95.3018 23.976 94.9932 23.976C94.8433 23.976 94.7729 23.9544 94.7466 23.9425C94.7323 23.9144 94.6972 23.8227 94.6972 23.608V16.3C94.6972 13.8535 93.8725 11.8715 92.1107 10.5392C90.4509 9.24203 88.3206 8.64 85.8132 8.64C83.3567 8.64 81.2766 9.14566 79.6655 10.2568L79.6588 10.2614C78.1005 11.3549 77.0696 12.8266 76.6008 14.6466L76.3627 15.571L77.2751 15.8518L81.4871 17.1478L82.4537 17.4452L82.7402 16.4753C83.01 15.5624 83.3967 15.0379 83.8187 14.7515C84.3096 14.4184 84.8899 14.24 85.5972 14.24C86.3429 14.24 86.8388 14.4558 87.1941 14.8111ZM94.7336 23.935C94.7338 23.9349 94.736 23.9361 94.7397 23.9392C94.7352 23.9368 94.7334 23.9352 94.7336 23.935ZM94.7514 23.9511C94.7522 23.9521 94.7525 23.9526 94.7524 23.9526L94.7514 23.9511ZM83.6925 22.5396L83.6925 22.5396L83.7039 22.532C83.9833 22.3458 84.4647 22.1518 85.2203 21.996C85.2211 21.9958 85.222 21.9956 85.2229 21.9955L87.8001 21.48C87.7856 22.1357 87.6335 22.573 87.4227 22.8672C87.1575 23.2119 86.8267 23.4533 86.4105 23.6031C85.9286 23.7766 85.3963 23.868 84.8052 23.868C84.362 23.868 84.028 23.7616 83.7612 23.5824C83.6302 23.4847 83.5372 23.35 83.5372 23.032C83.5372 22.64 83.649 22.5677 83.6919 22.5399L83.6925 22.5396ZM35.5511 4.78C35.5511 5.85324 35.8707 6.82776 36.6646 7.50962C37.4294 8.16647 38.4711 8.408 39.6111 8.408C40.7512 8.408 41.7928 8.16647 42.5577 7.50962C43.3516 6.82776 43.6711 5.85324 43.6711 4.78C43.6711 3.69901 43.3543 2.71688 42.5628 2.02777C41.7977 1.36173 40.7539 1.116 39.6111 1.116C38.4684 1.116 37.4246 1.36173 36.6595 2.02777C35.868 2.71688 35.5511 3.699 35.5511 4.78Z"
            stroke="white"
            strokeWidth="inherit"
          />
        </svg>
        <div className="line"></div>
      </div>
    </div>
  );
};

export default Loader;
