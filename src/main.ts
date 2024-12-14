import './style.css';

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.querySelector<HTMLCanvasElement>('#canvas')!;
    canvas.width = window.visualViewport!.width;
    canvas.height = window.visualViewport!.height;
    const ctx = <CanvasRenderingContext2D>canvas.getContext('2d');
    let color: string;
    let size: number;
    let activePointerIds: number[] = [];

    const colorButtons = document.querySelectorAll<HTMLInputElement>(
        '#fieldset_colors input[type=radio]',
    )!;
    const previewElement = document.querySelector<HTMLDivElement>('#preview')!;
    const input_size = document.querySelector<HTMLInputElement>('#input_size')!;

    const changeColor = (newColour: string): void => {
        color = newColour;
        ctx.fillStyle = newColour;
    };
    const changeSize = (newSize: number): void => {
        size = newSize;
    };
    const updatePreview = (): void => {
        previewElement.style.width = `${size}px`;
        previewElement.style.height = `${size}px`;
        previewElement.style.backgroundColor = color;
    };
    const draw = (size: number, x: number, y: number): void => {
        ctx.fillRect(x - size / 2, y - size / 2, size, size);
    };
    const colorButtonHandler = (e: Event): void => {
        const button = e.target as HTMLInputElement;
        console.log(`change: ${button.id} => ${button.checked}`);
        if (!button.checked) return;
        changeColor(button.dataset.color as string);
        updatePreview();
    };

    colorButtons.forEach((e) => {
        e.addEventListener('change', colorButtonHandler);
    });

    input_size.addEventListener('change', (e) => {
        changeSize(parseInt((e.target as HTMLInputElement).value));
        updatePreview();
    });

    // Initialize options
    changeColor('red');
    changeSize(10);
    updatePreview();

    // This works on everything I tried except for Firefox Android. For some
    // reason a second touch pointer stops after the first 'pointermove' and no
    // more events seem to come for that pointer. Not sure if that's a mistake
    // I've made or something wrong with FF Android specifically. Maybe need to
    // experiment with https://patrickhlauke.github.io/touch/ on FF Android to
    // see if not all expected events are received.
    canvas.addEventListener('pointerdown', (e) => {
        activePointerIds.push(e.pointerId);
        draw(size, e.offsetX, e.offsetY);
    });
    canvas.addEventListener('pointermove', (e) => {
        if (activePointerIds.includes(e.pointerId)) {
            draw(size, e.offsetX, e.offsetY);
        }
    });
    canvas.addEventListener('pointerup', (e) => {
        activePointerIds = activePointerIds.filter((el) => el !== e.pointerId);
    });

    // Stop touch events on the canvas from scrolling the page
    canvas.addEventListener(
        'touchstart',
        (e) => {
            e.preventDefault();
        },
        { passive: false },
    );

    canvas.addEventListener(
        'touchmove',
        (e) => {
            e.preventDefault();
        },
        { passive: false },
    );
});
