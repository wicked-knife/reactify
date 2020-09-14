import React, { useRef, useState } from "react";
import Modal from "./modal";
import { render, cleanup, fireEvent } from "@testing-library/react";
import { renderHook, act } from "@testing-library/react-hooks";

describe("Modal render", () => {
  test("Modal should be rendered if props visible is true, modal should close when change visible to false", () => {
    const { result } = renderHook(() => useState(true));
    const { rerender } = render(<Modal visible={result.current[0]}></Modal>);

    expect(document.querySelector(".rf-modal-root")).toBeInTheDocument();
    expect(document.querySelector(".rf-modal-mask")).toBeInTheDocument();
    expect(document.querySelector(".rf-modal")).toBeInTheDocument();

    act(() => result.current[1](false));
    rerender(<Modal visible={result.current[0]}></Modal>);
    // 等待3000ms动画结束
    setTimeout(() => { 
      expect(document.querySelector(".rf-modal-root")).toBeNull();
      expect(document.querySelector(".rf-modal-mask")).toBeNull();
      expect(document.querySelector(".rf-modal")).toBeNull();
      cleanup();
    }, 3000);
  });
});

describe('Modal mask', () => {
  test('Click modal mask modal should close by default', () => {
    const {result} = renderHook(() => useState(true))
    const handleModalClose = () => act(() => result.current[1](false))
    const {rerender} = render(<Modal visible={result.current[0]} onClose={handleModalClose}></Modal>)
    fireEvent.click(document.querySelector('.rf-modal-mask')!)
    rerender(<Modal visible={result.current[0]} onClose={handleModalClose}></Modal>)
    // 等待3000ms动画结束
    setTimeout(() => {
      expect(document.querySelector('.rf-modal-root')).toBeNull()
      expect(document.querySelector('.rf-modal-mask')).toBeNull()
      expect(document.querySelector('.rf-modal')).toBeNull()
    }, 3000);
  })
})

describe('Modal Ref', () => {
  test('Parent component should receive Modal ref', () => {
    const {result: refResult} = renderHook(() => useRef(null))
    const {result: stateResult} = renderHook(() => useState(false))
    const {rerender} = render(<Modal visible={stateResult.current[0]} ref={refResult.current}></Modal>)
    setTimeout(() => {
      expect(refResult.current.current).not.toBeNull()
      expect(refResult.current.current.closeModal).not.toBeNull()
      act(() => stateResult.current[1](false))
      rerender(<Modal visible={stateResult.current[0]} ref={refResult.current}></Modal>)
      setTimeout(() => {
        expect(refResult.current.current).toBeNull()
      }, 300);
    }, 300);
  })
})
