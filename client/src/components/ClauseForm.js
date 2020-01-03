import React from "react";
import { useForm, useField, splitFormProps } from "react-form";
import { postClauses } from '../utils/restClient'

// Regex expression for checking valid clauses w/ potential
// whitespace at beginning or end. Check if it's valid with:
// `validClause.test({ string clause })`
let validClause = /^ *(?:not )?x\d+(?: or (?:not )?x\d+)* *$/;

async function sendToServer(values) {
    console.log('input is ',values);
    const response = await postClauses(values);
    console.log('response is ', response);
}
  
async function fakeCheckValidClause(name, instance) {
    if (!name) {
        return "A clause is required";
    }

    return instance.debounce(async () => {
        console.log("checking clause");
        await new Promise(resolve => setTimeout(resolve, 1000));
        // All names are valid, so return a false error
        return false;
    }, 500);
}
  
const InputField = React.forwardRef((props, ref) => {
    // Let's use splitFormProps to get form-specific props
    const [field, fieldOptions, rest] = splitFormProps(props);

    // Use the useField hook with a field and field options
    // to access field state
    const {
        meta: { error, isTouched, isValidating },
        getInputProps
    } = useField(field, fieldOptions);

    // Build the field
    return (
        <>
        <input {...getInputProps({ ref, ...rest })} />{" "}
        {isValidating ? (
            <em>Validating...</em>
        ) : isTouched && error ? (
            <em>{error}</em>
        ) : null}
        </>
    );
});

export function ClauseForm(props) {
    // Use the useForm hook to create a form instance
    const {
        Form,
        meta: { isSubmitting, canSubmit }
    } = useForm({
        onSubmit: async (values, instance) => {
            // onSubmit (and everything else in React Form)
            // has async support out-of-the-box
            await sendToServer(values);
            console.log("Huzzah!");
        },
        // debugForm: true
    });

    // TODO: start with 1 clause and make button to add clauses
    // TODO: define field="{}[0-9]+" as constant since it's also used in app.py

    return (
        <div>
            <Form>
                <div>
                    <label>
                    Clause1: <InputField field="clause1" validate={fakeCheckValidClause} />
                    </label>
                    <label>
                    Clause2: <InputField field="clause2" validate={fakeCheckValidClause} />
                    </label>
                    <label>
                    Clause3: <InputField field="clause3" validate={fakeCheckValidClause} />
                    </label>
                </div>
                <div>
                    <button type="submit" disabled={!canSubmit}>
                    Submit
                    </button>
                </div>

                <div>
                    <em>{isSubmitting ? "Submitting..." : null}</em>
                </div>
            </Form>
            <button className="prev-button" onClick={props.onPrevClick}>Prev Step</button>
            <button className="next-button" onClick={props.onNextClick}>Next Step</button>
        </div>    
    );
}
