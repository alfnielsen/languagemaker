import produce from "immer"
import React, { FC, useEffect, useState } from "react"
import styled from "styled-components"
import { useImmerState } from "../hooks/useImmerState"

import { useStructures } from "../logic/StructureArea"
import DeleteButton from "./Generel/DeleteButton"
import TextBox from "./Generel/TextBox"
import TextField from "./Generel/TextField"

interface IEditStructureProp {}

const EditStructure: FC<IEditStructureProp> = () => {
  const { current, save, update, remove } = useStructures()
  const [atTest, setAtTest] = useState(0)
  useEffect(() => {
    if (atTest < 0 || !current?.testCode) {
      setAtTest(0)
    } else if (atTest > current.testCode.length - 1) {
      setAtTest(current.testCode.length)
    }
  }, [current, atTest])
  const [stack, updateStack] = useImmerState([], true)
  if (!current) return null

  return (
    <div>
      <hr />
      <b>Edit structure:</b>
      <br />
      name:
      <TextField
        type="text"
        value={current.name}
        onChange={(value) => {
          save(
            produce(current, (draft) => {
              draft.name = value
            })
          )
        }}
      />
      <DeleteButton
        onDeleteClickRelease={() => {
          remove(current)
        }}
      >
        Delete
      </DeleteButton>
      <hr />
      <MoveButtonStyled
        disabled={atTest === 0}
        onClick={() => {
          if (atTest > 0) {
            setAtTest(atTest - 1)
          }
        }}
      >
        ⇦
      </MoveButtonStyled>
      <MoveButtonStyled
        disabled={atTest >= current.testCode.length - 1}
        onClick={() => {
          if (atTest < current.testCode.length - 1) {
            setAtTest(atTest + 1)
          }
        }}
      >
        ⇨
      </MoveButtonStyled>
      <button
        onClick={() => {
          save(
            produce(current, (draft) => {
              draft.testCode.splice(atTest + 1, 0, {
                name: "new test",
                code: "var foo = ()=>{\n   var s = '';\n}",
              })
            })
          )
        }}
      >
        Add test case
      </button>
      <DeleteButton
        disabled={current.testCode[atTest] === undefined}
        onDeleteClickRelease={() => {
          if (current.testCode[atTest] !== undefined) {
            save(
              produce(current, (draft) => {
                draft.testCode.splice(atTest, 1)
              })
            )
          }
        }}
      >
        Delete test
      </DeleteButton>
      <div>
        {current.testCode.map((test, i) => (
          <Selected
            key={i}
            selected={i === atTest}
            onClick={() => {
              setAtTest(i)
            }}
          >
            {test.name}
          </Selected>
        ))}
      </div>
      {current.testCode[atTest] && (
        <>
          <TextField
            onChange={(value) => {
              save(
                produce(current, (draft) => {
                  draft.testCode[atTest].name = value
                })
              )
            }}
            value={current.testCode[atTest].name}
          />
          <TextBoxStyled
            key={current.id + "_" + atTest}
            onChange={(value) => {
              save(
                produce(current, (draft) => {
                  draft.testCode[atTest].code = value
                })
              )
            }}
            value={current.testCode[atTest].code}
          />
        </>
      )}
    </div>
  )
}

interface ISelected {
  selected?: boolean
}

const Selected = styled.div<ISelected>`
  padding: 8px;
  cursor: pointer;
  width: 160px;
  background: ${({ selected }) => (selected ? "#ccc" : "#fff")};
  &:hover {
    background: #ddd;
  }
`

const TextBoxStyled = styled(TextBox)`
  display: block;
  width: 350px;
  height: 250px;
`

const MoveButtonStyled = styled.button`
  width: 80px;
`

export default EditStructure
