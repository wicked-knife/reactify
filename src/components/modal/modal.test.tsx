import React, { useRef, useState } from 'react'
import Modal, {RefInterface} from './index'
import { render, fireEvent } from '@testing-library/react'
import { renderHook, act } from '@testing-library/react-hooks'

describe('Modal render', () => {
  test('Modal should be rendered if props visible is true, modal should close when change visible to false', () => {
    const { result } = renderHook(() => useState(true))
    const { rerender } = render(<Modal visible={result.current[0]}></Modal>)

    expect(document.querySelector('.rf-modal-root')).toBeInTheDocument()
    expect(document.querySelector('.rf-modal-mask')).toBeInTheDocument()
    expect(document.querySelector('.rf-modal')).toBeInTheDocument()

    act(() => result.current[1](false))
    rerender(<Modal visible={result.current[0]}></Modal>)
    // 等待3000ms动画结束
    setTimeout(() => { 
      expect(document.querySelector('.rf-modal-root')).toBeNull()
      expect(document.querySelector('.rf-modal-mask')).toBeNull()
      expect(document.querySelector('.rf-modal')).toBeNull()
    }, 3000)
  })
})

describe('Modal maskClosable', () => {
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
    }, 3000)
  })
})

describe('Modal Ref', () => {
  test('Parent component should receive Modal ref', () => {
    const {result: refResult} = renderHook(() => useRef<RefInterface>(null))
    const {result: stateResult} = renderHook(() => useState(false))
    const {rerender} = render(<Modal visible={stateResult.current[0]} ref={refResult.current}></Modal>)
    setTimeout(() => {
      expect(refResult.current.current).not.toBeNull()
      expect(refResult.current.current!.closeModal).not.toBeNull()
      act(() => stateResult.current[1](false))
      rerender(<Modal visible={stateResult.current[0]} ref={refResult.current}></Modal>)
      setTimeout(() => {
        expect(refResult.current.current).toBeNull()
      }, 300)
    }, 300)
  })

  test('Call ref.closeModal() Modal should be closed', () => {
    const {result: refResult} = renderHook(() => useRef<RefInterface>(null))
    const {result: stateResult} = renderHook(() => useState(false))
    render(<Modal visible={stateResult.current[0]} ref={refResult.current}></Modal>)
    setTimeout(() => {
      expect(refResult.current.current).not.toBeNull()
      expect(refResult.current.current!.closeModal).not.toBeNull()
      refResult.current.current?.closeModal()
      setTimeout(() => {
        expect(refResult.current.current).toBeNull()
        expect(document.querySelector('.rf-modal-root')).toBeNull()
      }, 300)
    }, 300)
  })
})

describe('Modal children', () => {
  test('Modal children should be rendered', () => {
    const {container} = render(<Modal visible={true}><div className="test-node">hello world</div></Modal>)
    const element = container.querySelector('text-node')
    setTimeout(() => {
      expect(element).toBeInTheDocument()
    }, 300)
  })
})

describe('Modal rerender', () => {
  test('Modal children should rerender when parent component rerender', () => {
    const {result: stateResult} = renderHook(() => useState(0))
    const forceReRender = () => act(() => stateResult.current[1](prev => prev + 1))
    const component = (
      <div>
        <button onClick={forceReRender}>click me</button>
        <Modal visible={true}>
          <div>count {stateResult.current[0]}</div>
        </Modal>
      </div>
    )
    const {rerender, queryByText} = render(component)
    setTimeout(() => {
      expect(queryByText('count 0')).toBeInTheDocument()
      fireEvent.click(queryByText('click me')!)
      rerender(component)
      expect(queryByText('count 0')).not.toBeInTheDocument()
      expect(queryByText('count 1')).toBeInTheDocument()
    }, 300)
  })
})

describe('Modal functional call', () => {
  test('Call Modal.show() Modal should render in screen', () => {
    Modal.show('test')
    setTimeout(() => {
      expect(document.querySelector('.rf-modal-root')).toBeInTheDocument()
    }, 300)
  })
})

describe('Modal className and styles', () => {
  test('Modal should have correct className', () => {
    const {container} = render(<Modal visible={true} className="test-className"></Modal>)
    setTimeout(() => {
      const element = container.querySelector('.rf-modal')
      expect(element).toHaveClass('test-className')
    }, 300)
  })

  test('Modal should have correct styles', () => {
    const {container} = render(<Modal visible={true} style={{backgroundColor: 'red', color: 'black', width: '200px'}}></Modal>)
    setTimeout(() => {
      const element = container.querySelector('.rf-modal')
      const computedStyle = window.getComputedStyle(element!)
      expect(computedStyle.backgroundColor).toBe('red')
      expect(computedStyle.color).toBe('black')
      expect(computedStyle.width).toBe('200px')
    }, 300)
  })
})

describe('Modal title', () => {
  test('Modal should have title if title is truthy', () => {
    const {queryByText} = render(<Modal visible={true} title="hello world"></Modal>)
    setTimeout(() => {
      const element = queryByText('hello world')
      expect(element).toBeInTheDocument()
    }, 300)
  })
})

describe('Modal footer', () => {
  test('Modal footer children should render in footer element', () => {
    const {container} = render(<Modal visible={true}>
      <Modal.Footer>
        <span className="test-node">hello world</span>
      </Modal.Footer>
    </Modal>)
    setTimeout(() => {
      expect(container.querySelector('.rf-modal-footer>.test-node')).toBeInTheDocument()
    }, 300)
  })

  test('Modal footer should not render if don\'t have Modal.Footer components', () => {
    const {container} = render(<Modal visible={true}>
        <span className="test-node">hello world</span>
    </Modal>)
    setTimeout(() => {
      expect(container.querySelector('.rf-modal-footer')).not.toBeInTheDocument()
    }, 300)
  })
})

describe('Modal width', () => {
  test('Modal should have correct width and min-width if set props width', () => {
    const modalWidth = '300px'
    const {container} = render(<Modal visible={true} width={modalWidth}>
      <span className="test-node">hello world</span>
    </Modal>)
    setTimeout(() => {
      const element = container.querySelector('.rf-modal')
      const styles = window.getComputedStyle(element!)
      expect(styles.width).toBe(modalWidth)
      expect(styles.minWidth).toBe(modalWidth)
    }, 300)
  })
})
